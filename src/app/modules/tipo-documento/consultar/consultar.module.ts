import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultarRoutingModule } from './consultar-routing.module';
import { ConsultarComponent } from './consultar.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [ConsultarComponent],
  imports: [
    CommonModule,
    ConsultarRoutingModule,
    SharedModule
  ]
})
export class ConsultarModule { }
