const WebSocket = require('ws');
jest.mock('ws');
jest.mock('dotenv/config');

const { WebsocketService } = require('./websocket-service');

jest.mock('../server', () => ({
  wss: { clients: new Set() },
}));

beforeEach(() => {
  WebSocket.mockClear();
  WebsocketService.instance = null;
  WebSocket.mockImplementation(() => ({
    on: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
  }));

  require('../server').wss.clients.clear();
});

describe('WebsocketService Singleton', () => {
  it('should return the same instance', () => {
    const instance1 = WebsocketService.getInstance();
    const instance2 = WebsocketService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should return the existing instance when attempting to create a new instance', () => {
    const initialInstance = WebsocketService.getInstance();
    const newInstance = new WebsocketService();
    expect(newInstance).toBe(initialInstance);
  });
});

describe('connect', () => {
  it('should establish a WebSocket connection', () => {
    const instance = WebsocketService.getInstance();
    instance.connect();
    expect(WebSocket).toHaveBeenCalledWith(expect.stringContaining('wss://ws.finnhub.io'));
  });

  it('should subscribe to a symbol if provided during connection', () => {
    const wsMock = {
      on: jest.fn((event, callback) => {
        if (event === 'open') {
          callback();
        }
      }),
      send: jest.fn(),
    };
    WebSocket.mockImplementation(() => wsMock);

    const instance = WebsocketService.getInstance();
    instance.subscribe = jest.fn();

    instance.connect('TEST');
    
    expect(instance.subscribe).toHaveBeenCalledWith('TEST');
  });
});

describe('subscribe', () => {
  it('should send subscribe request to the WebSocket', () => {
    const wsMock = {
      readyState: WebSocket.OPEN,
      send: jest.fn(),
      on: jest.fn(),
    };
    WebSocket.mockImplementation(() => wsMock);

    const instance = WebsocketService.getInstance();
    instance.connect();
    instance.subscribe('AAPL');

    expect(wsMock.send).toHaveBeenCalledWith(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }));
  });
});

describe('broadcastData', () => {
  it('should broadcast data to all connected clients', () => {
    const clientMock = { readyState: WebSocket.OPEN, send: jest.fn() };
    require('../server').wss.clients.add(clientMock);

    const instance = WebsocketService.getInstance();
    instance.broadcastData('Test Data');

    expect(clientMock.send).toHaveBeenCalledWith('Test Data');
  });
});