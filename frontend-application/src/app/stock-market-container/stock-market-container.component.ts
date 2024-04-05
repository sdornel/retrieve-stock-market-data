import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { StockMarketApiService } from '../services/stock-market-api.service';
import { HttpClientModule } from '@angular/common/http';
import { StockMarketGraphComponent } from './stock-market-graph/stock-market-graph.component';

@Component({
  selector: 'app-stock-market-container',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, HttpClientModule, StockMarketGraphComponent],
  providers: [StockMarketApiService],
  templateUrl: './stock-market-container.component.html',
  styleUrl: './stock-market-container.component.css'
})
export class StockMarketContainerComponent {}
