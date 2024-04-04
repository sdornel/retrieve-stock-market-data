const finnhub = require('finnhub');
const WebSocket = require('ws');
const { wss } = require('../server');
require('dotenv').config();

const finnhubWs = new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`);

finnhubWs.on('open', () => {
    console.log('Connected to Finnhub WebSocket');
    // finnhubWs.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AAPL' }));
    // finnhubWs.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' }));
    // finnhubWs.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'IC MARKETS:1' }));
});

function broadcastData(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data); // Forward Finnhub data
        }
    });
}

finnhubWs.on('message', (data) => {
    console.log('Data from Finnhub:', data.toString());
    broadcastData(data.toString()); // Only pass the data after converting it to a string
});

// Handling errors for Finnhub WebSocket connection
finnhubWs.on('error', (error) => {
    console.error('Error in Finnhub WebSocket connection:', error);
});

// When your WebSocket server gets a new connection
wss.on('connection', connection = (ws) => {
    console.log('A client connected');
    ws.send(JSON.stringify({ message: 'Welcome! Connection established.' }));
    ws.on('error', (error) => {
        console.error('Error in client WebSocket connection:', error);
    });
    // onOpenFinnhubSocket(wss);
    ws.on('close', () => {
        console.log('Client disconnected');
        unsubscribe('AAPL');
    });
});

// Unsubscribe
var unsubscribe = (symbol) => {
    finnhubWs.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}

module.exports = { unsubscribe };