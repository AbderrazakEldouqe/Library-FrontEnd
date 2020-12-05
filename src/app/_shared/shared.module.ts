import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { KeysPipe } from './pipes/keys.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, PageNotFoundComponent, LayoutComponent, NavbarComponent, SidebarComponent, KeysPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule
  ],
  exports: [
    ReactiveFormsModule,
    KeysPipe
  ]
})
export class SharedModule { }
