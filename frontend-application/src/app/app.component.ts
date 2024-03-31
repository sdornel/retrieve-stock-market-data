import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockMarketContainerComponent } from './stock-market-container/stock-market-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StockMarketContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-for-testing-rate-limiter';
}
