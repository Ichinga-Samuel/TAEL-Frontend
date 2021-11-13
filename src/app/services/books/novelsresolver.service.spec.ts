import { TestBed } from '@angular/core/testing';

import { NovelsResolverService } from './novelsresolver.service';

describe('NovelsResolverService', () => {
  let service: NovelsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
