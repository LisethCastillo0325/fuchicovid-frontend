import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultarComponent } from './consultar.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultarRoutingModule { }
