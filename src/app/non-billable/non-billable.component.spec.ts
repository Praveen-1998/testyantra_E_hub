import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonBillableComponent } from './non-billable.component';

describe('NonBillableComponent', () => {
  let component: NonBillableComponent;
  let fixture: ComponentFixture<NonBillableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonBillableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonBillableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
