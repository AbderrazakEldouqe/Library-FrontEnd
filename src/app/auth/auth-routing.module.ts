import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {RequestResetPasswordComponent} from './components/request-reset-password/request-reset-password.component';
import {ResponseResetPasswordComponent} from './components/response-reset-password/response-reset-password.component';

const routes: Routes = [
  {path: '', component: LoginComponent, data: {animation: 'isLeft'}},
  {path: 'login', component: LoginComponent, data: {animation: 'isLeft'}},
  {path: 'register', component: RegisterComponent, data: {animation: 'isRight'}},
  {path: 'request-reset-password', component: RequestResetPasswordComponent, data: {animation: 'isRight'}},
  {path: 'response-reset-password', component: ResponseResetPasswordComponent, data: {animation: 'isRight'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
