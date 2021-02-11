import { TestBed } from '@angular/core/testing';

import { AssociacaoService } from './associacao.service';

describe('AssociacaoService', () => {
  let service: AssociacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
