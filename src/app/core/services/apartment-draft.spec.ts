import { TestBed } from '@angular/core/testing';

import { ApartmentDraftService } from './apartment-draft.service';

describe('ApartmentDraftService', () => {
  let service: ApartmentDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentDraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
