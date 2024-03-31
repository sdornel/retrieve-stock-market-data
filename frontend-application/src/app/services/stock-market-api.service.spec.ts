import { TestBed } from '@angular/core/testing';

import { StockMarketApiService } from './stock-market-api.service';

describe('StockMarketApiService', () => {
  let service: StockMarketApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockMarketApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
