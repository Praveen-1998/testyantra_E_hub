import { TestBed } from '@angular/core/testing';

import { NonBillableService } from './non-billable.service';

describe('NonBillableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonBillableService = TestBed.get(NonBillableService);
    expect(service).toBeTruthy();
  });
});
