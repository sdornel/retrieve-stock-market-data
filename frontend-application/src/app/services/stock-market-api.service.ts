import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { BehaviorSubject, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockMarketApiService {
  candlestickData$ = new BehaviorSubject<any>({});

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
  symbol: string = 'AAPL';
  interval: string = '1day';
  startDate: string = '2024-01-03';
  endDate: string = '2024-01-28';


  constructor(private http: HttpClient) {
    this.fetchCandlestickData();
  }

  // fetches data depending on what params are used. either default params or used selected ones
  fetchCandlestickData() {
    const params = {
      symbol: this.symbol,
      interval: this.interval,
      startDate: this.startDate,
      endDate: this.endDate,
    }

    this.http.get<any>('http://localhost:3000/api/fetchCandlestickData', { params }).pipe(
      first()
    )
    .subscribe(data => {
      this.candlestickData$.next(data);
    });
  }

  getCandlestickDataObservable() {
    return this.candlestickData$.asObservable();
  }
}
