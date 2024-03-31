import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketGraphComponent } from './stock-market-graph.component';

describe('StockMarketGraphComponent', () => {
  let component: StockMarketGraphComponent;
  let fixture: ComponentFixture<StockMarketGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMarketGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockMarketGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
