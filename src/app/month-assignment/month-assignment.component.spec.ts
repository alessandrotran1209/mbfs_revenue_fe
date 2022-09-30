import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthAssignmentComponent } from './month-assignment.component';

describe('MonthAssignmentComponent', () => {
  let component: MonthAssignmentComponent;
  let fixture: ComponentFixture<MonthAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
