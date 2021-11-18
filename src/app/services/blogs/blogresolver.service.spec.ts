import { TestBed } from '@angular/core/testing';

import { BlogResolverService } from './blogresolver.service';

describe('BlogResolverService', () => {
  let service: BlogResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
