import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillableemployeesinfoComponent } from './billableemployeesinfo.component';

describe('BillableemployeesinfoComponent', () => {
  let component: BillableemployeesinfoComponent;
  let fixture: ComponentFixture<BillableemployeesinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillableemployeesinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillableemployeesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
