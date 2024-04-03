import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { StockMarketApiService } from '../../services/stock-market-api.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-stock-market-graph',
  standalone: true,
  imports: [NgApexchartsModule, NgIf, CommonModule],
  providers: [StockMarketApiService],
  templateUrl: './stock-market-graph.component.html',
  styleUrl: './stock-market-graph.component.css'
})
export class StockMarketGraphComponent implements OnInit {
  private $destroy = new Subject<void>();

  ws = new WebSocket('ws://localhost:3000');
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
    text: '',
    align: 'left'
  };

  exchange: string = '';
  exchangeTimezone: string = '';
  interval: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(
    private stockMarketApiService: StockMarketApiService,
  ) {}

  ngOnInit(): void {
    // it might make sense to move all of this one level up due to options selector component
    // see https://blogs.halodoc.io/handling-subscription-angular/ when you have child components
    this.stockMarketApiService.fetchCandlestickData().pipe(takeUntil(this.$destroy)).subscribe((data) => {
      this.title.text = data.meta.symbol;
      this.exchange = data.meta.exchange;
      this.exchangeTimezone = data.meta.exchange_timezone;
      this.interval = data.meta.interval;
      this.startDate = data.meta.start_date;
      this.endDate = data.meta.end_date;
      // i believe i am forced to use the USD currency and exchanges. need to decide what to "allow" the user to do and see
      // i do not want to pay money for this API

      this.series[0].data = data.values.map((item: any) => ({
        x: item.datetime,
        y: [item.open, item.high, item.low, item.close]
      }));;
      console.log('Candlestick data:', data);
      console.log('title', this.title);
    });

    // Event handler for when the connection is established
    this.ws.onopen = () => {
      console.log('Connected to server');
    };

    // Event handler for receiving messages from the server
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('message', message);
    };

    // Event handler for handling disconnection
    this.ws.onclose = () => {
      console.log('Disconnected from server');
    };
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    if (this.ws) {
      this.ws.close();
    }
  }
}
