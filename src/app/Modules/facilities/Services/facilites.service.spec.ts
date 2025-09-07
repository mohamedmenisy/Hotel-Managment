import { TestBed } from '@angular/core/testing';

import { FacilitesService } from './facilites.service';

describe('FacilitesService', () => {
  let service: FacilitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
