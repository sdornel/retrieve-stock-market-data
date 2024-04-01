const http = require('http');
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
app.use(cors())

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { server, wss, app };