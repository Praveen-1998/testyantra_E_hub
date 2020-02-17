import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillabletableComponent } from './billabletable.component';

describe('BillabletableComponent', () => {
  let component: BillabletableComponent;
  let fixture: ComponentFixture<BillabletableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillabletableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillabletableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
