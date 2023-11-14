import { TestBed } from '@angular/core/testing';

import { ServicoExtrasService } from './servico-extras.service';

describe('ServicoExtrasService', () => {
  let service: ServicoExtrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoExtrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
