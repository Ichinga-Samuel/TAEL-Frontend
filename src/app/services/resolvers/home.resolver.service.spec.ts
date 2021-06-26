import { TestBed } from '@angular/core/testing';

import { HomeResolverService } from './home.resolver.service';

describe('Home.ResolverService', () => {
  let service: HomeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
