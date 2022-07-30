import { TestBed } from '@angular/core/testing';

import { ApplicationConfigurationService } from './application-configuration.service';

describe('ApplicationConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationConfigurationService = TestBed.get(
      ApplicationConfigurationService
    );
    expect(service).toBeTruthy();
  });
});
