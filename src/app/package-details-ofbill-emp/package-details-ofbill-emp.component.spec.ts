import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailsOfbillEmpComponent } from './package-details-ofbill-emp.component';

describe('PackageDetailsOfbillEmpComponent', () => {
  let component: PackageDetailsOfbillEmpComponent;
  let fixture: ComponentFixture<PackageDetailsOfbillEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageDetailsOfbillEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDetailsOfbillEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
