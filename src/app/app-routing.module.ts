import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'paciente',
    loadChildren: () => import('./modules/paciente/paciente.module').then(m => m.PacienteModule)
  },
  {
    path: 'tipo-documento',
    loadChildren: () => import('./modules/tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'funcionario-publico',
    loadChildren: () => import('./modules/funcionario-publico/funcionario-publico.module').then(m => m.FuncionarioPublicoModule)
  },
  {
    path: 'profesional-salud',
    loadChildren: () => import('./modules/profesional-salud/profesional-salud.module').then(m => m.ProfesionalSaludModule)
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
