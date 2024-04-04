import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StockMarketApiService } from '../../services/stock-market-api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stock-market-options-selector',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './stock-market-options-selector.component.html',
  styleUrl: './stock-market-options-selector.component.css'
})
export class StockMarketOptionsSelectorComponent implements OnInit {
  private $destroy = new Subject<void>();
  optionsForm!: FormGroup;

  constructor(private stockMarketApiService: StockMarketApiService) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.optionsForm = new FormGroup({
      symbol: new FormControl('AAPL', Validators.required,),
      interval: new FormControl('1day', Validators.required,),
      startDate: new FormControl('2024-01-01', Validators.required,),
      endDate: new FormControl('2024-01-31', Validators.required,)
    });
  }

  onSubmit() {
    this.stockMarketApiService.symbol = this.optionsForm.value.symbol;
    this.stockMarketApiService.interval = this.optionsForm.value.interval;
    this.stockMarketApiService.startDate = this.optionsForm.value.startDate;
    this.stockMarketApiService.endDate = this.optionsForm.value.endDate;

    this.stockMarketApiService.fetchCandlestickData().subscribe(res => {
      console.log('Data fetched on form submit', res);
    });
    // this.stockMarketApiService.fetchCandlestickData()
    // .pipe(takeUntil(this.$destroy)) // Use takeUntil for automatic unsubscription
    // .subscribe({
    //   next: (data) => {
    //     console.log('Data fetched on form submit', data);
    //     // Optionally trigger another action here
    //   },
    //   error: (error) => console.error(error)
    // });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
