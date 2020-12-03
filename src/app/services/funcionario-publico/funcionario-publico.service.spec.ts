import { TestBed } from '@angular/core/testing';

import { FuncionarioPublicoService } from './funcionario-publico.service';

describe('FuncionarioPublicoService', () => {
  let service: FuncionarioPublicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionarioPublicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
