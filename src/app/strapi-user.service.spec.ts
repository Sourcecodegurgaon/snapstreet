import { TestBed } from '@angular/core/testing';

import { StrapiUserService } from './strapi-user.service';

describe('StrapiUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StrapiUserService = TestBed.get(StrapiUserService);
    expect(service).toBeTruthy();
  });
});
