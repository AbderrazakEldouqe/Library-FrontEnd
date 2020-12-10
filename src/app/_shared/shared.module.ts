import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { KeysPipe } from './pipes/keys.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { PaginationsComponent } from './components/paginations/paginations.component';
import {OrderModule} from 'ngx-order-pipe';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, PageNotFoundComponent, LayoutComponent, NavbarComponent, SidebarComponent, KeysPipe, PaginationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    KeysPipe,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    PaginationsComponent,
    OrderModule
  ]
})
export class SharedModule { }
