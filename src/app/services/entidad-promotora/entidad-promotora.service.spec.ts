import { TestBed } from '@angular/core/testing';

import { EntidadPromotoraService } from './entidad-promotora.service';

describe('EntidadPromotoraService', () => {
  let service: EntidadPromotoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadPromotoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
