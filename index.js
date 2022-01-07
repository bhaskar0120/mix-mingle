"use strict";
// After a connection has been established, the server will send the UID of the connected client to the client.
// The client will then send the UID of the client to the server with every message.
exports.__esModule = true;
var ws_1 = require("ws");
// Generate UID for the client 36 characters long
function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
var lobby = new Map();
var socket = new ws_1.WebSocketServer({ port: 3000 }); // Create a new websocket server
socket.on("connection", function (ws) {
    console.log("Connection established");
    ws.send("Welcome to the lobby");
    ws.close();
});
