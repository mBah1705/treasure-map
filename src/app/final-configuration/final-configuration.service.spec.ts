import { TestBed } from '@angular/core/testing';

import { FinalConfigurationService } from './final-configuration.service';

describe('FinalConfigurationService', () => {
  let service: FinalConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
