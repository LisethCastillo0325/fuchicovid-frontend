import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar/control-sidebar.component';




@NgModule({
  declarations: [
    SidebarComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    ControlSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    ControlSidebarComponent
  ]
})
export class SharedModule { }
