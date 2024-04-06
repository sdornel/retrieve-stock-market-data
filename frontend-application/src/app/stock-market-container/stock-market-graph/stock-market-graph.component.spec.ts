import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StockMarketGraphComponent } from './stock-market-graph.component';
import { StockMarketApiService } from '../../services/stock-market-api.service';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CandlestickData } from '../../types/types';

describe('StockMarketGraphComponent', () => {
  let component: StockMarketGraphComponent;
  let fixture: ComponentFixture<StockMarketGraphComponent>;
  let mockStockMarketApiService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMarketGraphComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [StockMarketApiService]
    }).compileComponents();


    fixture = TestBed.createComponent(StockMarketGraphComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, 'setupForm');
      spyOn(component, 'fetchCandlestickData');
      spyOn(component, 'setupWebsocket');
      component.ngOnInit();
    });
    it('calls setupForm', () => {
      expect(component.setupForm).toHaveBeenCalled();
    });
    it('calls fetchCandlestickData', () => {
      expect(component.fetchCandlestickData).toHaveBeenCalled();
    });
    it('calls setupWebsocket', () => {
      expect(component.setupWebsocket).toHaveBeenCalled();
    });
  });

  describe('fetchCandlestickData()', () => {
    describe('data is returned', () => {
      const mockData: CandlestickData = {
        meta: {
          symbol: 'TEST',
          exchange: 'Test Exchange',
          exchange_timezone: 'Test/TimeZone',
          interval: '1d',
          type: 'asdf',
          mic_code: 'miccode',
          currency: 'USD',
        },
        status: 'ok',
        values: [
          { datetime: '2024-04-01', open: '1', high: '2', low: '0.5', hightime: 'asdf', close: '1', volume: '3' },
          { datetime: '2024-04-02', open: '1.5', high: '2.5', low: '1', hightime: 'asdf', close: '2', volume: '4' }
        ],
      };
      beforeEach(fakeAsync(() => {
        mockStockMarketApiService = fixture.debugElement.injector.get(StockMarketApiService);
        mockStockMarketApiService.candlestickData$.next(mockData);
        component.fetchCandlestickData();
      }));
  
      it('retrieves data and assigns state', () => {
        expect(component.title).toEqual({ text: mockData.meta.symbol, align: 'left' });
        expect(component.exchange).toEqual(mockData.meta.exchange);
        expect(component.exchangeTimezone).toEqual(mockData.meta.exchange_timezone);
        expect(component.interval).toEqual(mockData.meta.interval);
        expect(component.startDate).toEqual(mockData.values[0].datetime);
        expect(component.endDate).toEqual(mockData.values[mockData.values.length-1].datetime);
        expect(component.series[0].data[0]).toEqual({
          x: mockData.values[0].datetime,
          y: [
            mockData.values[0].open,
            mockData.values[0].high,
            mockData.values[0].low,
            mockData.values[0].close,
          ],
        });
      });
    });

    describe('no data is returned', () => {
      const mockData: CandlestickData = {
        meta: {
          symbol: '',
          exchange: '',
          exchange_timezone: '',
          interval: '',
          type: '',
          mic_code: '',
          currency: '',
        },
        status: 'error',
        values: [],
      };
      beforeEach(fakeAsync(() => {
        mockStockMarketApiService = fixture.debugElement.injector.get(StockMarketApiService);
        mockStockMarketApiService.candlestickData$.next(mockData);
        component.fetchCandlestickData();
      }));
  
      it('retrieves data and assigns state', () => {
        // these are the only two that really matter if nothing gets returned
        expect(component.title).toEqual({ text: 'AAPL', align: 'left' });
        expect(component.series.length).toEqual(1);
      });
    });
  });

  describe('setupWebsocket()', () => {
    let mockWebSocket: any;
  
    beforeEach(() => {
      mockWebSocket = {
        onopen: null,
        onmessage: null,
        onclose: null,
        send: jasmine.createSpy('send'),
        close: jasmine.createSpy('close')
      };
  
      component.ws = mockWebSocket as unknown as WebSocket;
      spyOn(console, 'log');
      component.setupWebsocket();
    });
  
    it('should log "Connected to server" when connected', () => {
      mockWebSocket.onopen();
      expect(console.log).toHaveBeenCalledWith('Connected to server');
    });
  
    it('should update sharePrice on receiving a valid message', () => {
      const messageEvent = { data: JSON.stringify({ type: 'stockUpdate', data: [{ p: 120 }] }) } as MessageEvent;
      mockWebSocket.onmessage(messageEvent);
      expect(component.sharePrice).toBe(120);
    });
  
    it('should ignore ping messages', () => {
      mockWebSocket.onmessage({ data: JSON.stringify({ type: 'ping' }) } as MessageEvent);
      expect(component.sharePrice).toBeNull();
    });
  
    it('should log "Disconnected from server" when disconnected', () => {
      mockWebSocket.onclose();
      expect(console.log).toHaveBeenCalledWith('Disconnected from server');
    });
  });

  describe('setupForm', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(StockMarketGraphComponent);
      component = fixture.componentInstance;
      component.setupForm();
    });
  
    it('should create the optionsForm with default values', () => {
      expect(component.optionsForm).toBeDefined();
      expect(component.optionsForm.value).toEqual({
        symbol: 'AAPL',
        interval: '1day',
        startDate: '2024-01-01',
        endDate: '2024-01-31'
      });
    });

    it('should attach required validators to all form controls', () => {
      const symbolControl = component.optionsForm.get('symbol') as AbstractControl;
      const intervalControl = component.optionsForm.get('interval') as AbstractControl;
      const startDateControl = component.optionsForm.get('startDate') as AbstractControl;
      const endDateControl = component.optionsForm.get('endDate') as AbstractControl;

      // Trigger the validators manually
      symbolControl.setValue('');
      intervalControl.setValue('');
      startDateControl.setValue('');
      endDateControl.setValue('');
  
      expect(symbolControl.valid).toBeFalsy();
      expect(intervalControl.valid).toBeFalsy();
      expect(startDateControl.valid).toBeFalsy();
      expect(endDateControl.valid).toBeFalsy();
  
      expect(symbolControl.errors!['required']).toBeTruthy();
      expect(intervalControl.errors!['required']).toBeTruthy();
      expect(startDateControl.errors!['required']).toBeTruthy();
      expect(endDateControl.errors!['required']).toBeTruthy();
    });
  });

  describe('onSubmit()', () => {
    beforeEach(() => {
      component.optionsForm = {
        value: {
          symbol: 'hi',
          interval: '1day',
          startDate: 'today',
          endDate: 'tomorrow',
        }
      } as any;

      mockStockMarketApiService = fixture.debugElement.injector.get(StockMarketApiService);
      mockStockMarketApiService.fetchCandlestickData = jasmine.createSpy('fetchCandlestickData');
      component.onSubmit();
    });

    it('sets state in stockMarketApiService', () => {
      expect(component.stockMarketApiService.symbol).toEqual(component.optionsForm.value.symbol);
      expect(component.stockMarketApiService.interval).toEqual(component.optionsForm.value.interval);
      expect(component.stockMarketApiService.startDate).toEqual(component.optionsForm.value.startDate);
      expect(component.stockMarketApiService.endDate).toEqual(component.optionsForm.value.endDate);
    });

    it('calls stockMarketApiService.fetchCandlestickData', () => {
      expect(mockStockMarketApiService.fetchCandlestickData).toHaveBeenCalled();
    });

    it('sets shareprice to null', () => {
      expect(component.sharePrice).toEqual(null);
    });
  });

  describe('ngOnDestroy()', () => {
    beforeEach(() => {
      mockStockMarketApiService = fixture.debugElement.injector.get(StockMarketApiService);
      mockStockMarketApiService.candlestickData$ = {
        unsubscribe: jasmine.createSpy('unsubscribe'),
      };
    });

    describe('websocket connection exists', () => {
      beforeEach(() => {
        component.ws = {
          close: jasmine.createSpy('close'),
        } as any;

        component.ngOnDestroy();
      });
      it('unsubscribes to candlestickData$ behavior subject', () => {
        expect(mockStockMarketApiService.candlestickData$.unsubscribe).toHaveBeenCalled();
      });

      it('closes the websocket', () => {
        expect(component.ws.close).toHaveBeenCalled();
      });
    });

    describe('websocket connection does not exist', () => {
      beforeEach(() => {
        component.ws = null as any;
        component.ngOnDestroy();
      });
      it('unsubscribes to candlestickData$ behavior subject', () => {
        expect(mockStockMarketApiService.candlestickData$.unsubscribe).toHaveBeenCalled();
      });

      it('does not attempt to close the websocket', () => {
        // Since there's no direct action to verify (we cannot check a method call on a null object),
        // this test ensures that ngOnDestroy doesn't throw any error, which can be considered
        // as passing the test that it doesn't attempt to close an undefined websocket.
        // This approach is more about ensuring the absence of errors rather than spying on actions.
        expect(() => component.ngOnDestroy()).not.toThrow();
      });
    });
  });
});
