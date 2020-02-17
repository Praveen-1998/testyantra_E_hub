import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsdataComponent } from './clientsdata.component';

describe('ClientsdataComponent', () => {
  let component: ClientsdataComponent;
  let fixture: ComponentFixture<ClientsdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
