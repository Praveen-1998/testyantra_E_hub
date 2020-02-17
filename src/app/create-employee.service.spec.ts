import { TestBed } from '@angular/core/testing';

import { CreateEmployeeService } from './create-employee.service';

describe('CreateEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateEmployeeService = TestBed.get(CreateEmployeeService);
    expect(service).toBeTruthy();
  });
});
