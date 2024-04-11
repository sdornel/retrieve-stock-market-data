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

    jasmine.clock().install();
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set candlestick data upon successful fetch', () => {
    const mockData = {
      meta: {
        currency: 'curr',
        exchange: 'new york',
        exchange_timezone: 'etc',
        interval: '1day',
        mic_code: 'asdf',
        symbol: 'AAPL',
        type: 'string',
      },
      status: 'ok',
      values: []
    };
    service.startDate = '2024-01-03';
    service.endDate = '2024-01-28';
    service.fetchCandlestickData();

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/api/fetchCandlestickData?symbol=AAPL&interval=1day&startDate=${service.startDate}&endDate=${service.endDate}`
    });

    // Assert the response is flushed with mock data
    req.flush(mockData);

    // Verify the internal BehaviorSubject is updated as expected
    service.candlestickData$.subscribe((data) => {
      expect(data).toEqual(mockData);
    });
  });

  describe('getStartAndEndDates()', () => {
    let result: any;
    let expectedStartDate: any;
    let expectedEndDate: any;
    beforeEach(() => {
      const mockToday = new Date(2024, 8, 15); // months are 0-indexed
      jasmine.clock().mockDate(mockToday);
      expectedStartDate = new Date(2024, 7, 15).toISOString().split('T')[0];
      expectedEndDate = mockToday.toISOString().split('T')[0]; // should be September 15, 2024
      result = service.getStartAndEndDates();
    });

    it('returns an object with start and end date', () => {
      expect(result.startDate).toEqual(expectedStartDate);
      expect(result.endDate).toEqual(expectedEndDate);
    });
  });
});