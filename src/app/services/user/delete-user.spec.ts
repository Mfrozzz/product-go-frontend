import { TestBed } from '@angular/core/testing';

import { DeleteUser } from './delete-user';

describe('DeleteUser', () => {
  let service: DeleteUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
