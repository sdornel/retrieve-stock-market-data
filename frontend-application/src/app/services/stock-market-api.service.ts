import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { BehaviorSubject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockMarketApiService {
  candlestickData$ = new BehaviorSubject<any>(null);

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
  // interval: string = '';
  // startDate: string = '';
  // endDate: string = '';
  symbol: string = 'AAPL';
  interval: string = '1day';
  startDate: string = '2024-01-03';
  endDate: string = '2024-01-28';


  constructor(private http: HttpClient) { }

  fetchCandlestickData() {
    const params = {
      symbol: this.symbol,
      interval: this.interval,
      startDate: this.startDate,
      endDate: this.endDate,
    }

    // // THIS GOT DATA TO UPDATE PROPERLY BUT NOT THE GRAPH
    return this.http.get<any>('http://localhost:3000/api/fetchCandlestickData', { params }).subscribe(data => {
        console.log('in subscription', data);
        this.title.text = data.meta.symbol;
        this.exchange = data.meta.exchange;
        this.exchangeTimezone = data.meta.exchange_timezone;
        this.interval = data.meta.interval;
        this.startDate = data.values[0].datetime;
        this.endDate = data.values[data.values.length - 1].datetime;
        // i believe i am forced to use the USD currency and exchanges. need to decide what to "allow" the user to do and see
        // i do not want to pay money for this API
  
        this.series[0].data = data.values.map((item: any) => ({
          x: item.datetime,
          y: [item.open, item.high, item.low, item.close]
        }));
        console.log('Candlestick data:', data);
        console.log('title', this.title);
    });

    // return this.http.get<any>('http://localhost:3000/api/fetchCandlestickData', { params })
  }

  getCandlestickDataObservable() {
    return this.candlestickData$.asObservable();
  }
}
