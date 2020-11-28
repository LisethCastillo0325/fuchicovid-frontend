import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views/views.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
   {
     path: '', component: ViewsComponent, children:[
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent }

     ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
