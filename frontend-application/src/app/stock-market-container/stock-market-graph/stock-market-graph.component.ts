import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { StockMarketApiService } from '../../services/stock-market-api.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WebSocketService } from '../../services/websocket-helper.service';

@Component({
  selector: 'app-stock-market-graph',
  standalone: true,
  imports: [ReactiveFormsModule, NgApexchartsModule, NgIf, CommonModule, MatGridListModule, MatCardModule],
  providers: [StockMarketApiService],
  templateUrl: './stock-market-graph.component.html',
  styleUrl: './stock-market-graph.component.css'
})
export class StockMarketGraphComponent implements OnInit {
  optionsForm!: FormGroup;

  ws: WebSocket = new WebSocket('ws://localhost:3000');
  sharePrice: number | null = null;
  displayErrorMessage = false;
  displayMarketClosedMessage = false;

  candlestickData: Array<any> = [];
  series: ApexAxisChartSeries = [{
    name: 'candle',
    data: []
  }];

  chart: ApexChart = {
    type: 'candlestick',
    height: 350,
    toolbar: {
      show: false
    },
  };

  xaxis: ApexXAxis = {
    type: 'datetime'
  };
  title: ApexTitleSubtitle = {
    text: 'AAPL',
    align: 'left'
  };

  exchange: string = '';
  exchangeTimezone: string = '';
  interval: string = '';
  startDate: string = '';
  endDate: string = '';

  lastClosingPrice: number | null = null;

  constructor(
    public stockMarketApiService: StockMarketApiService,
    private websocketService: WebSocketService,
  ) {
    this.stockMarketApiService.fetchCandlestickData();
  }

  ngOnInit(): void {
    this.setupForm();
    this.fetchCandlestickData();
  }

  fetchCandlestickData(): void {
    // populates the apx-chart component with data
    this.stockMarketApiService.candlestickData$
    .subscribe(data => {
      if (!data || data.values.length === 0) return;
      this.title = {
        ...this.title,
        text: data.meta.symbol,
      }
      this.exchange = data.meta.exchange;
      this.exchangeTimezone = data.meta.exchange_timezone;
      this.interval = data.meta.interval;
      this.startDate = data.values[0].datetime;
      this.endDate = data.values[data.values.length - 1].datetime;
      // I believe I am forced to use the USD currency and exchanges. Need to decide what to "allow" the user to do and see
      // I do not want to pay money for this API
      
      this.series[0].data = data.values.map((item: any) => ({
        x: item.datetime,
        y: [item.open, item.high, item.low, item.close] // if you modify this array ensure you update the html file for price at closing
      }));

      this.lastClosingPrice = this.series[0].data[0].y;

      this.ws = new WebSocket('ws://localhost:3000');
      this.setupWebsocket();
    });
  }

  setupWebsocket(): void {
    this.ws.onopen = () => {
      console.log('Connected to ws server');
    };

    this.ws.onmessage = (event: MessageEvent<any>) => {
      const message = JSON.parse(event.data);
      // const message = { type: 'ping' } as any; // for debugging purposes
      if (message.type !== 'ping') {
        this.sharePrice = message.data[message.data.length-1].p // get latest share price from the retrieved websocket data;
        this.displayErrorMessage = false;
      } else {
        this.websocketService.trackTimeToNonpingResponse().subscribe((error: boolean) => {
          this.displayErrorMessage = error;
        });
      };
    }

    this.ws.onclose = () => {
      console.log('Disconnected from server');
    };
  }


  setupForm(): void {
    this.optionsForm = new FormGroup({
      symbol: new FormControl('AAPL', Validators.required,),
      interval: new FormControl('1day', Validators.required,),
      startDate: new FormControl('2024-01-01', Validators.required,),
      endDate: new FormControl('2024-01-31', Validators.required,)
    });
  }

  onSubmit(): void {
    this.stockMarketApiService.symbol = this.optionsForm.value.symbol;
    this.stockMarketApiService.interval = this.optionsForm.value.interval;
    this.stockMarketApiService.startDate = this.optionsForm.value.startDate;
    this.stockMarketApiService.endDate = this.optionsForm.value.endDate;
    this.sharePrice = null; // after fetching new candlestick data we want to reset the price

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    this.stockMarketApiService.fetchCandlestickData();
  }


  ngOnDestroy(): void {
    this.stockMarketApiService.candlestickData$.unsubscribe();
    if (this.ws) {
      this.ws.close();
    }
  }
}
