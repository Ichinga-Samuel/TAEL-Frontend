import { TestBed } from '@angular/core/testing';

import { TextbooksResolverService } from './textbooksresolver.service';

describe('TextbooksResolverService', () => {
  let service: TextbooksResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextbooksResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
