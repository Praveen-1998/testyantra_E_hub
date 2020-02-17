import { TestBed } from '@angular/core/testing';

import { BillableEmployeesService } from './billable-employees.service';

describe('BillableEmployeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillableEmployeesService = TestBed.get(BillableEmployeesService);
    expect(service).toBeTruthy();
  });
});
