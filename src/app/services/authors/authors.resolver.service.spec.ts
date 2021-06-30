import { TestBed } from '@angular/core/testing';

import { AuthorsResolverService } from './authors.resolver.service';

describe('Authors.ResolverService', () => {
  let service: AuthorsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
