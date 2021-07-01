import { TestBed } from '@angular/core/testing';

import { ExpressInterceptor } from './express_interceptor';

describe('ExpressInterceptor', () => {
  let service: ExpressInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
