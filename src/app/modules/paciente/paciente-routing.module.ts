import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente.component';

const routes: Routes = [
  {
    path: '',
    component: PacienteComponent,
    children: [
      {
        path: '',
        redirectTo: 'consultar',
        pathMatch: 'full'
      },
      {
        path: 'crear',
        loadChildren: () => import('./crear/crear.module').then(m => m.CrearModule)
      },
      {
        path: 'editar/:id',
        loadChildren: () => import('./crear/crear.module').then(m => m.CrearModule)
      },
      {
        path: 'consultar',
        loadChildren: () => import('./consultar/consultar.module').then(m => m.ConsultarModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
