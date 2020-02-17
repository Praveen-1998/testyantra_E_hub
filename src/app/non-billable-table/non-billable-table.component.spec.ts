import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonBillableTableComponent } from './non-billable-table.component';

describe('NonBillableTableComponent', () => {
  let component: NonBillableTableComponent;
  let fixture: ComponentFixture<NonBillableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonBillableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonBillableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
