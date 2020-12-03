import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfesionalSaludComponent} from './profesional-salud.component';

const routes: Routes = [
  {
    path:'',
    component: ProfesionalSaludComponent,
    children: [
      {
        path: '',
        redirectTo: 'consultar',
        pathMatch: 'full',
      },
      {
        path: 'registrar',
        loadChildren: () => import('./registrar/registrar.module').then(m => m.RegistrarModule)
      },
      {
        path: 'editar/:id',
        loadChildren: () => import('./registrar/registrar.module').then(m => m.RegistrarModule)
      },
      {
        path: 'consultar',
        loadChildren: () => import('./consultar/consultar.module').then(m => m.ConsultarModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesionalSaludRoutingModule { }
