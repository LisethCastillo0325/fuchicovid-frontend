import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioPublicoComponent } from './funcionario-publico.component';

describe('FuncionarioPublicoComponent', () => {
  let component: FuncionarioPublicoComponent;
  let fixture: ComponentFixture<FuncionarioPublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioPublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
