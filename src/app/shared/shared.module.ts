import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar/control-sidebar.component';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    SidebarComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    ControlSidebarComponent,
    ContentHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DataTablesModule
  ],
  exports: [
    SidebarComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    ControlSidebarComponent,
    ContentHeaderComponent,
    CommonModule,
    FormsModule,
    DataTablesModule
  ]
})
export class SharedModule { }
