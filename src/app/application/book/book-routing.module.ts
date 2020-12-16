import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContainerBooksComponent} from './components/container-books/container-books.component';

const routes: Routes = [
  {path: '', component: ContainerBooksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
