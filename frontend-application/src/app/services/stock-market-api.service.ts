import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { BehaviorSubject, first, take, tap } from 'rxjs';
import { CandlestickData } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class StockMarketApiService {
  candlestickData$ = new BehaviorSubject<CandlestickData>({
    meta: {
      symbol: '',
      type: '',
      mic_code: '',
      interval: '',
      exchange_timezone: '',
      exchange: '',
      currency: '',
    },
    status: '',
    values: [],
  });

  series: ApexAxisChartSeries = [{
    name: 'candle',
    data: [{ x: '', y: [] }]
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
  
  startDate = '';
  endDate = '';

  constructor(private http: HttpClient) {}

  getStartAndEndDates(): { startDate: string; endDate: string; } {
    const endDate = new Date().toISOString().split('T')[0];
    let date = new Date(endDate);
    date.setMonth(date.getMonth() - 1); // subtract one month
    const startDate = date.toISOString().split('T')[0];
    return { startDate, endDate };
  }

  // fetches data depending on what params are used. either default params or used selected ones
  fetchCandlestickData(): void {
    const params = {
      symbol: this.symbol,
      interval: this.interval,
      startDate: this.startDate,
      endDate: this.endDate,
    }

    this.http.get<any>('http://localhost:3000/api/fetchCandlestickData', { params }).pipe(
      first()
    )
    .subscribe((data: CandlestickData) => {
      this.candlestickData$.next(data);
    });
  }
}
