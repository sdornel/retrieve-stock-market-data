import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { StockMarketApiService } from '../../services/stock-market-api.service';
import { Subject, filter, takeUntil } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-stock-market-graph',
  standalone: true,
  imports: [NgApexchartsModule, NgIf, CommonModule, MatGridListModule, MatCardModule],
  providers: [StockMarketApiService],
  templateUrl: './stock-market-graph.component.html',
  styleUrl: './stock-market-graph.component.css'
})
export class StockMarketGraphComponent implements OnInit, AfterViewInit {
  private $destroy = new Subject<void>();

  // private chart: ApexCharts;
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
  // chart!: ApexCharts;
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
    public stockMarketApiService: StockMarketApiService,
  ) {}

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.stockMarketApiService.fetchCandlestickData();

    // Event handler for when the connection is established
    // this.ws.onopen = () => {
    //   console.log('Connected to server');
    // };

    // // Event handler for receiving messages from the server
    // this.ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   console.log('message', message);
    // };

    // // Event handler for handling disconnection
    // this.ws.onclose = () => {
    //   console.log('Disconnected from server');
    // };
  }

  temp() {
    // for some reason the data must be updated within this component for chart to re-render
    this.stockMarketApiService.title = {
      ...this.stockMarketApiService.title,
      text: 'AAPL',
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    if (this.ws) {
      this.ws.close();
    }
  }
}
