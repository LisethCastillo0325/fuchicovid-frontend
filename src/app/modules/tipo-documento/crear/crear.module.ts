import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearRoutingModule } from './crear-routing.module';
import { CrearComponent } from './crear.component';


@NgModule({
  declarations: [CrearComponent],
  imports: [
    CommonModule,
    CrearRoutingModule
  ]
})
export class CrearModule { }
