import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { StockMarketApiService } from '../services/stock-market-api.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { StockMarketGraphComponent } from './stock-market-graph/stock-market-graph.component';

@Component({
  selector: 'app-stock-market-container',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, HttpClientModule, StockMarketGraphComponent],
  providers: [StockMarketApiService],
  templateUrl: './stock-market-container.component.html',
  styleUrl: './stock-market-container.component.css'
})
export class StockMarketContainerComponent {
  // private $destroy = new Subject<void>();
  // Create a WebSocket connection
  // ws = new WebSocket('ws://localhost:3000');

  constructor(
    // @Inject(PLATFORM_ID) private platformId: Object,
    // private stockMarketApiService: StockMarketApiService
  ) {}
  
  ngOnInit(): void {
    // // see https://blogs.halodoc.io/handling-subscription-angular/ when you have child components
    // this.stockMarketApiService.fetchCandlestickData().pipe(takeUntil(this.$destroy)).subscribe((data) => {
    //   console.log('Candlestick data:', data);
    // });


    // // Event handler for when the connection is established
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

  // ngOnDestroy(): void {
  //   this.$destroy.next();
  //   this.$destroy.complete();
  //   if (this.ws) {
  //     this.ws.close();
  //   }
  // }
}
