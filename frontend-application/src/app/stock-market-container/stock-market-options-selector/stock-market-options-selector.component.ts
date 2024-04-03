import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-market-options-selector',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-market-options-selector.component.html',
  styleUrl: './stock-market-options-selector.component.css'
})
export class StockMarketOptionsSelectorComponent implements OnInit {
  optionsForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.optionsForm = new FormGroup({
      symbol: new FormControl(''),
      interval: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.optionsForm.value);
  }
}
