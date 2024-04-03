import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-stock-market-options-selector',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
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
      symbol: new FormControl('', Validators.required,),
      interval: new FormControl('', Validators.required,),
      startDate: new FormControl('', Validators.required,),
      endDate: new FormControl('', Validators.required,)
    });
  }

  onSubmit() {
    debugger
    console.log(this.optionsForm.value);
  }
}
