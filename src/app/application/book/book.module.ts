import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import { ContainerBooksComponent } from './components/container-books/container-books.component';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { FormAddEditBooksComponent } from './components/form-add-edit-books/form-add-edit-books.component';
import { HeaderBooksComponent } from './components/header-books/header-books.component';
import { ViewBookComponent } from './components/view-book/view-book.component';


@NgModule({
  declarations: [ContainerBooksComponent, ListBooksComponent, FormAddEditBooksComponent, HeaderBooksComponent, ViewBookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule
  ]
})
export class BookModule { }
