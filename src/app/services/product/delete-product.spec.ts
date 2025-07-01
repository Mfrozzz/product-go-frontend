import { TestBed } from '@angular/core/testing';

import { DeleteProduct } from './delete-product';

describe('DeleteProduct', () => {
  let service: DeleteProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteProduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
