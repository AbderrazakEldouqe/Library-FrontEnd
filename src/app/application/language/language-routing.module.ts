import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContainerLanguagesComponent} from './components/container-languages/container-languages.component';

const routes: Routes = [
  {path: '', component: ContainerLanguagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }
