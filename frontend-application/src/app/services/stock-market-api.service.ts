import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockMarketApiService {
  candlestickData$ = new BehaviorSubject<any>(null);

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
    console.log('params', params);
    return this.http.get<any>('http://localhost:3000/api/fetchCandlestickData', { params });
    // return this.http.get<any>('http://localhost:3000/api/fetchCandlestickData', { params }).pipe(take(1)).subscribe(data => {
    //   console.log('service gets data?', data);
    //   this.candlestickData$.next(data);
    // });

    // return this.http.get<any>('http://localhost:3000/api/fetchCandlestickData', { params }).pipe(
    //   take(1),
    //   tap(data => this.candlestickData$.next(data))
    // );
    // return this.http.get<any>('http://localhost:3000/api/fetchCandlestickData', { params }).pipe(
    //   tap(data => this.candlestickData$.next(data))
    // );
  }

  getCandlestickDataObservable() {
    return this.candlestickData$.asObservable();
  }

  fetchRealtimeData() {
    return ;
  }
}
