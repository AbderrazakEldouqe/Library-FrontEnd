import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {SharedModule} from '../_shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestResetPasswordComponent } from './components/request-reset-password/request-reset-password.component';
import { ResponseResetPasswordComponent } from './components/response-reset-password/response-reset-password.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, RequestResetPasswordComponent, ResponseResetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
