// After a connection has been established, the server will send the UID of the connected client to the client.
// The client will then send the UID of the client to the server with every message.

import { WebSocketServer } from "ws";

// Generate UID for the client 36 characters long
function generateUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/*************************** RANDOM THOUGHT ******************************************/
/*
interface Room  {
    ws1: WebSocket;
    ws2?: WebSocket;
}

let lobby = new Map<string, Room>();

const socket = new WebSocketServer({ port: 3000 });         // Create a new websocket server
socket.on("connection", (ws: WebSocket) => {                // Greet the client
    console.log("Connection established");
    ws.send("Welcome to the lobby");
    ws.close();
});
*/