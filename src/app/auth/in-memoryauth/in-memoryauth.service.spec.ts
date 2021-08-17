import { TestBed } from '@angular/core/testing';

import { InMemoryauthService } from './in-memoryauth.service';

describe('InMemoryauthService', () => {
  let service: InMemoryauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
