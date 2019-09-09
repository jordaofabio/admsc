import { TestBed } from '@angular/core/testing';

import { CartinhasService } from './cartinhas.service';

describe('CartinhasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartinhasService = TestBed.get(CartinhasService);
    expect(service).toBeTruthy();
  });
});
