import { TestBed } from '@angular/core/testing';

import { AuthorResolverService } from './author.resolver.service';

describe('AuthorResolverService', () => {
  let service: AuthorResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
