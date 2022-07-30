import { TestBed } from '@angular/core/testing';

import { SkipService } from './skip.service';

describe('SkipService', () => {
  let service: SkipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
