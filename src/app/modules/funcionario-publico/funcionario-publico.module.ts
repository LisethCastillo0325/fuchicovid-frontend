import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioPublicoRoutingModule } from './funcionario-publico-routing.module';
import { FuncionarioPublicoComponent } from './funcionario-publico.component';


@NgModule({
  declarations: [FuncionarioPublicoComponent],
  imports: [
    CommonModule,
    FuncionarioPublicoRoutingModule
  ]
})
export class FuncionarioPublicoModule { }
