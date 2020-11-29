import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { TipoDocumentoComponent } from './tipo-documento.component';


@NgModule({
  declarations: [TipoDocumentoComponent],
  imports: [
    CommonModule,
    TipoDocumentoRoutingModule
  ]
})
export class TipoDocumentoModule { }
