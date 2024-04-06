const axios = require('axios');
const { app } = require('./server');
const { WebsocketService } = require('./websocket/websocket-service');

const websocketService = WebsocketService.getInstance(); // only ever use one instance

async function fetchCandlestickData(symbol, interval, start_date, end_date) {
    try {
        const apiKey = process.env.TWELVEDATA_API_KEY;
        // see https://twelvedata.com/docs#endpoints
        const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&start_date=${start_date}&end_date=${end_date}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching candlestick data:', error);
        throw error;
    }
}

// Example usage:
// let symbol = 'AAPL'; // Example stock symbol (Apple Inc.)
// let interval = '1day'; // Interval for candlesticks (e.g., '1min', '1hour', '1day')
// let start_date = '2024-01-01'; // Start date (YYYY-MM-DD)
// let end_date = '2024-01-31'; // End date (YYYY-MM-DD)
app.get('/api/fetchCandlestickData', (req, res) => {
    const symbol = req.query.symbol;
    const interval = req.query.interval;
    const start_date = req.query.startDate;
    const end_date = req.query.endDate;

    fetchCandlestickData(symbol, interval, start_date, end_date)
    .then(data => {
        res.send(JSON.stringify(data));
        websocketService.restart(symbol); // ensure we only have one websocket connection at a time
        websocketService.subscribe(symbol);
    })
    .catch(error => {
        console.error('Error:', error);
        res.send(JSON.stringify(error));
    });
});
