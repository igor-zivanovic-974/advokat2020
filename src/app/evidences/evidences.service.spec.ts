import { TestBed } from '@angular/core/testing';

import { EvidencesService } from './evidences.service';

describe('EvidencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvidencesService = TestBed.get(EvidencesService);
    expect(service).toBeTruthy();
  });
});
