import { TestBed } from '@angular/core/testing';

import { PendenciaService } from './pendencia.service';

describe('PendenciaService', () => {
  let service: PendenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
