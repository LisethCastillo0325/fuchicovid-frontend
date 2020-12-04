import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalSaludComponent } from './profesional-salud.component';

describe('ProfesionalSaludComponent', () => {
  let component: ProfesionalSaludComponent;
  let fixture: ComponentFixture<ProfesionalSaludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalSaludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
