const { fetchCandlestickData } = require('./index');
const { server } = require('./server');
const axios = require('axios');
jest.mock('axios');

jest.mock('./websocket/websocket-service', () => ({
    WebsocketService: {
      getInstance: jest.fn().mockImplementation(() => ({
        restart: jest.fn(),
        subscribe: jest.fn(),
      })),
    },
}));

describe('fetchCandlestickData', () => {
    // Mock successful API call
    it('fetches data successfully from an API', async () => {
      axios.get.mockResolvedValueOnce({ data: { result: 'mockData' } }); // Ensure this matches the expected structure
      const data = await fetchCandlestickData('AAPL', '1day', '2024-01-01', '2024-01-31');
      expect(axios.get).toHaveBeenCalled();
      expect(data).toEqual({ result: 'mockData' });
    });
  
    // Mock API failure
    it('throws an error when the API call fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('API call failed'));
      await expect(fetchCandlestickData('AAPL', '1day', '2024-01-01', '2024-01-31'))
        .rejects
        .toThrow('API call failed');
    });
});

afterAll((done) => {
    server.close(done);
});