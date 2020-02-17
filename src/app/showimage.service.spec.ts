import { TestBed } from '@angular/core/testing';

import { ShowimageService } from './showimage.service';

describe('ShowimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowimageService = TestBed.get(ShowimageService);
    expect(service).toBeTruthy();
  });
});
