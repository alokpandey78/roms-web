/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HealthsafetyService } from './healthsafety.service';

describe('Service: Healthsafety', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthsafetyService]
    });
  });

  it('should ...', inject([HealthsafetyService], (service: HealthsafetyService) => {
    expect(service).toBeTruthy();
  }));
});
