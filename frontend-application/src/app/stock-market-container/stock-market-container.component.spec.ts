import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketContainerComponent } from './stock-market-container.component';

describe('StockMarketContainerComponent', () => {
  let component: StockMarketContainerComponent;
  let fixture: ComponentFixture<StockMarketContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMarketContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockMarketContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
