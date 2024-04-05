import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockMarketApiService } from './stock-market-api.service';

describe('StockMarketApiService', () => {
  let service: StockMarketApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockMarketApiService]
    });
    service = TestBed.inject(StockMarketApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set candlestick data upon successful fetch', () => {
    const mockData = { someKey: 'someValue' };
    service.fetchCandlestickData();

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/api/fetchCandlestickData?symbol=AAPL&interval=1day&startDate=2024-01-03&endDate=2024-01-28'
    });

    // Assert the response is flushed with mock data
    req.flush(mockData);

    // Verify the internal BehaviorSubject is updated as expected
    service.candlestickData$.subscribe((data) => {
      expect(data).toEqual(mockData);
    });
  });
});