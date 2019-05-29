import { TestBed } from '@angular/core/testing';

import { TagarrayService } from './tagarray.service';

describe('TagarrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagarrayService = TestBed.get(TagarrayService);
    expect(service).toBeTruthy();
  });
});
