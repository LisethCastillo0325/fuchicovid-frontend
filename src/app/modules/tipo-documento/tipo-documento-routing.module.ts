import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDocumentoComponent } from './tipo-documento.component';

const routes: Routes = [
  {
    path:'',
    component: TipoDocumentoComponent,
    children: [
      {
        path: '',
        redirectTo: 'consultar',
        pathMatch: 'full',
      },
      {
        path: 'crear',
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
export class TipoDocumentoRoutingModule { }
