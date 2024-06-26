const finnhub = require('finnhub');
const WebSocket = require('ws');
const { wss } = require('../server');
require('dotenv').config();

class WebsocketService {
    static instance = null;
    finnhubWs = new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`);

    // establish a singleton pattern. we only want one instance of WebsocketService used throughout the application
    constructor() {
        if (WebsocketService.instance) {
            return WebsocketService.instance;
        }

        this.connect();
        WebsocketService.instance = this;
    }

    // this is how the singleton should be accessed
    static getInstance() {
        if (!WebsocketService.instance) {
            WebsocketService.instance = new WebsocketService();
        }
        return WebsocketService.instance;
    }

    connect(symbol) {
        this.finnhubWs = new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`);

        this.finnhubWs.on('open', () => {
            console.log('Connected to Finnhub WebSocket');
            if (symbol) {
                this.subscribe(symbol);
            }
        });

        this.finnhubWs.on('message', (data) => {
            console.log('Data from Finnhub:', data.toString());
            this.broadcastData(data.toString());
        });

        this.finnhubWs.on('error', (error) => {
            console.error('Error in Finnhub WebSocket connection:', error);
        });
    }

    subscribe(symbol) {
        if (this.finnhubWs.readyState === WebSocket.OPEN) {
            console.log('sending data as socket is open', symbol);
            this.finnhubWs.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }));
        } else {
            console.log('sending data once socket is open', symbol);
            this.finnhubWs.once('open', () => {
                this.finnhubWs.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }));
            });
        }
    }

    unsubscribe(symbol) {
        this.finnhubWs.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }));
    }

    restart(symbol) {
        this.finnhubWs.close(); // This will trigger the 'close' event
        this.connect(symbol); // Reconnect and optionally subscribe to a new symbol
    }

    broadcastData(data) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    }
}

module.exports = { WebsocketService };