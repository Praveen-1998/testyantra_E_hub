import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillableEmployeesComponent } from './billable-employees.component';

describe('BillableEmployeesComponent', () => {
  let component: BillableEmployeesComponent;
  let fixture: ComponentFixture<BillableEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillableEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillableEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
