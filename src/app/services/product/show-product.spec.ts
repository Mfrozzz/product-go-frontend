import { TestBed } from '@angular/core/testing';

import { ShowProduct } from './show-product';

describe('ShowProduct', () => {
  let service: ShowProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowProduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
