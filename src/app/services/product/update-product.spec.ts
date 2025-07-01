import { TestBed } from '@angular/core/testing';

import { UpdateProduct } from './update-product';

describe('UpdateProduct', () => {
  let service: UpdateProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateProduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
