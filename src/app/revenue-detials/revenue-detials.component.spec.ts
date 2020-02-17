import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueDetialsComponent } from './revenue-detials.component';

describe('RevenueDetialsComponent', () => {
  let component: RevenueDetialsComponent;
  let fixture: ComponentFixture<RevenueDetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueDetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
