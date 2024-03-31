import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketOptionsSelectorComponent } from './stock-market-options-selector.component';

describe('StockMarketOptionsSelectorComponent', () => {
  let component: StockMarketOptionsSelectorComponent;
  let fixture: ComponentFixture<StockMarketOptionsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMarketOptionsSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockMarketOptionsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
