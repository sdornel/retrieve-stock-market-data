import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockMarketApiService {

  constructor(private http: HttpClient) { }

  fetchCandlestickData() {
    return this.http.get<any>('http://localhost:3000/api/fetchCandlestickData');
  }

  fetchRealtimeData() {
    return ;
  }
}
