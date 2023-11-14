import { TestBed } from '@angular/core/testing';

import { CartaoAcessosService } from './cartao-acessos.service';

describe('CartaoAcessosService', () => {
  let service: CartaoAcessosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartaoAcessosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
