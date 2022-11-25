import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedRevenueComponent } from './accumulated-revenue.component';

describe('AccumulatedRevenueComponent', () => {
  let component: AccumulatedRevenueComponent;
  let fixture: ComponentFixture<AccumulatedRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccumulatedRevenueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccumulatedRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
