const axios = require('axios');
const { app } = require('./server');
require('./websocket/websocket-service'); // required for websocket to open. do not remove unless you know for sure the websocket can open

async function fetchCandlestickData(symbol, interval, start_date, end_date) {
    try {
        // const apiKey = process.env.TWELVEDATA_API_KEY;
        // const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&start_date=${start_date}&end_date=${end_date}&apikey=${apiKey}`;
        // const response = await axios.get(apiUrl);
        // return response.data;
        return new Promise(null);
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
    console.log('req', req.query);
    const symbol = req.query.symbol;
    const interval = req.query.interval;
    const start_date = req.query.startDate;
    const end_date = req.query.endDate;
    fetchCandlestickData(symbol, interval, start_date, end_date)
    .then(data => {
        // console.log('Candlestick data:', data);
        // res.send(JSON.stringify(data));
        res.send(JSON.stringify(
            {
                meta: {
                  symbol: 'AAPL',
                  interval: '1day',
                  currency: 'USD',
                  exchange_timezone: 'America/New_York',
                  exchange: 'NASDAQ',
                  mic_code: 'XNGS',
                  type: 'Common Stock'
                },
                values: [
                  {
                    datetime: '2024-01-26',
                    open: '194.27000',
                    high: '194.75999',
                    low: '191.94000',
                    close: '192.42000',
                    volume: '44594000'
                  },
                  {
                    datetime: '2024-01-25',
                    open: '195.22000',
                    high: '196.27000',
                    low: '193.11000',
                    close: '194.17000',
                    volume: '54822100'
                  },
                  {
                    datetime: '2024-01-24',
                    open: '195.42000',
                    high: '196.38000',
                    low: '194.34000',
                    close: '194.50000',
                    volume: '53631300'
                  },
                  {
                    datetime: '2024-01-23',
                    open: '195.02000',
                    high: '195.75000',
                    low: '193.83000',
                    close: '195.17999',
                    volume: '42355600'
                  },
                  {
                    datetime: '2024-01-22',
                    open: '192.30000',
                    high: '195.33000',
                    low: '192.25999',
                    close: '193.89000',
                    volume: '60133900'
                  },
                  {
                    datetime: '2024-01-19',
                    open: '189.33000',
                    high: '191.95000',
                    low: '188.82001',
                    close: '191.56000',
                    volume: '68741000'
                  },
                  {
                    datetime: '2024-01-18',
                    open: '186.09000',
                    high: '189.14000',
                    low: '185.83000',
                    close: '188.63000',
                    volume: '78005800'
                  },
                  {
                    datetime: '2024-01-17',
                    open: '181.27000',
                    high: '182.92999',
                    low: '180.30000',
                    close: '182.67999',
                    volume: '47317400'
                  },
                  {
                    datetime: '2024-01-16',
                    open: '182.16000',
                    high: '184.25999',
                    low: '180.92999',
                    close: '183.63000',
                    volume: '65603000'
                  },
                  {
                    datetime: '2024-01-12',
                    open: '186.06000',
                    high: '186.74001',
                    low: '185.19000',
                    close: '185.92000',
                    volume: '40444700'
                  },
                  {
                    datetime: '2024-01-11',
                    open: '186.53999',
                    high: '187.05000',
                    low: '183.62000',
                    close: '185.59000',
                    volume: '49128400'
                  },
                  {
                    datetime: '2024-01-10',
                    open: '184.35001',
                    high: '186.39999',
                    low: '183.92000',
                    close: '186.19000',
                    volume: '46792900'
                  },
                  {
                    datetime: '2024-01-09',
                    open: '183.92000',
                    high: '185.14999',
                    low: '182.73000',
                    close: '185.14000',
                    volume: '42841800'
                  },
                  {
                    datetime: '2024-01-08',
                    open: '182.09000',
                    high: '185.60001',
                    low: '181.50000',
                    close: '185.56000',
                    volume: '59144500'
                  },
                  {
                    datetime: '2024-01-05',
                    open: '181.99001',
                    high: '182.75999',
                    low: '180.17000',
                    close: '181.17999',
                    volume: '62303300'
                  },
                  {
                    datetime: '2024-01-04',
                    open: '182.14999',
                    high: '183.09000',
                    low: '180.88000',
                    close: '181.91000',
                    volume: '71983600'
                  },
                  {
                    datetime: '2024-01-03',
                    open: '184.22000',
                    high: '185.88000',
                    low: '183.42999',
                    close: '184.25000',
                    volume: '58414500'
                  }
                ],
                status: 'ok'
              }
        ))
    })
    .catch(error => {
        console.error('Error:', error);
        res.send(JSON.stringify(error));
    });
});
