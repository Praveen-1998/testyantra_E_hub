import { TestBed } from '@angular/core/testing';

import { ClientsDetailsService } from './clients-details.service';

describe('ClientsDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientsDetailsService = TestBed.get(ClientsDetailsService);
    expect(service).toBeTruthy();
  });
});
