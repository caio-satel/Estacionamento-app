import { TestBed } from '@angular/core/testing';

import { RegistroEntradaSaidasService } from './registro-entrada-saidas.service';

describe('RegistroEntradaSaidasService', () => {
  let service: RegistroEntradaSaidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEntradaSaidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
