import { TestBed } from '@angular/core/testing';

import { ListUsers } from './list-users';

describe('ListUsers', () => {
  let service: ListUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
