import { TestBed } from '@angular/core/testing';

import { GetUserById } from './get-user-by-id';

describe('GetUserById', () => {
  let service: GetUserById;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserById);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
