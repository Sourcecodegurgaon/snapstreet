import { TestBed } from '@angular/core/testing';

import { StrapiAuthService } from './strapi-auth.service';

describe('StrapiAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StrapiAuthService = TestBed.get(StrapiAuthService);
    expect(service).toBeTruthy();
  });
});
