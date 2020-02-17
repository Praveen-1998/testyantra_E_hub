import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidUnpaidTableComponent } from './paid-unpaid-table.component';

describe('PaidUnpaidTableComponent', () => {
  let component: PaidUnpaidTableComponent;
  let fixture: ComponentFixture<PaidUnpaidTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidUnpaidTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidUnpaidTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
