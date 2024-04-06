import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockMarketGraphComponent } from './stock-market-graph.component';
import { StockMarketApiService } from '../../services/stock-market-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('StockMarketGraphComponent', () => {
  let component: StockMarketGraphComponent;
  let fixture: ComponentFixture<StockMarketGraphComponent>;
  let stockMarketApiServiceMock: any;
  let websocketSpy: jasmine.SpyObj<WebSocket>;

  beforeEach(async () => {
    stockMarketApiServiceMock = {
      fetchCandlestickData: jasmine.createSpy('fetchCandlestickData'),
      candlestickData$: null, // new BehaviorSubject(null)
    };

    websocketSpy = jasmine.createSpyObj('WebSocket', ['send', 'close', 'onopen', 'onmessage', 'onclose']);
    spyOn(window, 'WebSocket').and.returnValue(websocketSpy as unknown as WebSocket);

    await TestBed.configureTestingModule({
      imports: [StockMarketGraphComponent, ReactiveFormsModule, HttpClientTestingModule],
      // declarations: [StockMarketGraphComponent],
      providers: [
        { provide: StockMarketApiService, useValue: stockMarketApiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StockMarketGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
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

  // describe('fetchCandlestickData', () => {
  //   beforeEach(() => {
  //     stockMarketApiServiceMock.candlestickData$.and.returnValue(of({
  //       meta: 'hi',
  //       status: 'ok',
  //       values: [{ hi: 'hi' }],
  //     }))
  //     component.fetchCandlestickData();
  //   });

  //   it('', () => {
  //     expect(1).toEqual(2);
  //   });
  // });
});
