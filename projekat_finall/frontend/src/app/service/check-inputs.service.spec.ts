import { TestBed } from '@angular/core/testing';

import { CheckInputsService } from './check-inputs.service';

describe('CheckInputsService', () => {
  let service: CheckInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
