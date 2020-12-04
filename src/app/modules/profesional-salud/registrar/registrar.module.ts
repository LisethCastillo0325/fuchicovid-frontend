import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../../shared/shared.module';
import { RegistrarRoutingModule } from './registrar-routing.module';
import { RegistrarComponent } from './registrar.component';
@NgModule({
  declarations: [RegistrarComponent],
  imports: [
    CommonModule,
    RegistrarRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
  
    MatFormFieldModule
   
  ],
  exports:[
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class RegistrarModule { }
