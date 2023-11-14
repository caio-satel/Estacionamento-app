import { TestBed } from '@angular/core/testing';

import { TarifariosService } from './tarifarios.service';

describe('TarifariosService', () => {
  let service: TarifariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
