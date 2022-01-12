import { WebSocketServer, WebSocket } from "ws";

const express = require('express');
const app = express();

// Generate a random Key 
function generateKey(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

interface Client extends WebSocket {
    key?: string;
}

const wss = new WebSocketServer({noServer: true});

const port = process.env.PORT || 8000;
function forceHTTPS(req,res,next){
    if(!req.secure && req.get('X-Forwarded-Proto') !== 'https' && process.env.NODE_ENV !== 'development'){
        return res.redirect('https://'+req.get('host')+req.url);
    }
    next();
}
app.use('/',express.static('public'));
const server = app.listen((process.env.PORT || 8000),()=>{
    console.log('Listening on port ' + port);
});
server.on('upgrade', (request, socket, head) => {
    if(request.url === '/chat') {
        wss.handleUpgrade(request,socket,head, function done(ws){
            wss.emit('connection', ws, request);
        });
    }
});
    
const Users: Map<string, Client> = new Map();           // A map of all connected users
const Queue: string[] = [];                             // A queue of all users that are waiting for a match
const ChatPartner = new Map<string, string>();          // A map of the Key of the client and the key of the partner

// A function that looks for new partners
function look(ws: Client): void{
    if(Queue.length > 0){
    // If there is a user waiting for a match, Pair the two users together and remove the user from the queue
        const partnerKey = Queue.shift();
        const partner = Users.get(partnerKey);
        ChatPartner.set(ws.key, partner.key);
        ChatPartner.set(partner.key, ws.key);
        // Send connected status to both users
        ws.send(JSON.stringify({
            type : 'status',
            value : 'Connected',
        }));
        partner.send(JSON.stringify({
            type : 'status',
            value : 'Connected',
        }));
    }
    else{
        // If there is no user waiting for a match, add the user to the queue
        ws.send( JSON.stringify({
            type : 'status',
            value : 'Waiting for a match',
        }
        ));
        Queue.push(ws.key);
    }
}

function disconnectPartner(ws : Client): void{

    const partner = ChatPartner.get(ws.key);
    ChatPartner.delete(ws.key);
    ChatPartner.delete(partner);

    // Send disconnected status to the partner
    Users.get(partner).send(JSON.stringify({
    type : 'status',
    value : 'Disconnected',
    }));
}

wss.on('connection', (ws:Client, req)=>{

    // Generate a random key for the user
    ws.key = generateKey();
    Users.set(ws.key, ws);

    // Look for a partner
    look(ws);

    ws.on('close' , ()=>{
        // Remove the user from the map
        Users.delete(ws.key);
        // Check if the user was paired with another user
        if(ChatPartner.has(ws.key)){
            disconnectPartner(ws);
        }
        // Check if the user was in the queue
        else if(Queue.includes(ws.key)){
            Queue.splice(Queue.indexOf(ws.key), 1);
        }
    });

    ws.on('message',(data)=>{
        // Convert the data to a JSON object
        const messageAsString:string = data.toString();
        const message = JSON.parse(messageAsString);

        if (message.type === 'next'){
            // If the user is the partner, disconnect partner and look for a new partner
            if(ChatPartner.has(ws.key)){
                disconnectPartner(ws);
                look(ws);
            }
            // Check if the user is not in the queue, if not, look for a new partner
            else if(!Queue.includes(ws.key)){
                look(ws);
            }
        }
        // If the user is the partner, send the message to the partner
        else{
            if(ChatPartner.has(ws.key)){
                const partnerKey = ChatPartner.get(ws.key);
                Users.get(partnerKey).send(messageAsString);
            }
        }

    });
});
