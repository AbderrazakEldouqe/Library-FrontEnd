import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContainerAccountsComponent} from './components/container-accounts/container-accounts.component';

const routes: Routes = [
  {path: '', component: ContainerAccountsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
