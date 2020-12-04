import { TestBed } from '@angular/core/testing';

import { ProfesionalSaludService } from './profesional-salud.service';

describe('ProfesionalSaludService', () => {
  let service: ProfesionalSaludService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesionalSaludService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
