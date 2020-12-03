import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesionalSaludRoutingModule } from './profesional-salud-routing.module';
import {ProfesionalSaludComponent} from './profesional-salud.component';

@NgModule({
  declarations: [ProfesionalSaludComponent],
  imports: [
    CommonModule,
    ProfesionalSaludRoutingModule
  ]
})
export class ProfesionalSaludModule { }
