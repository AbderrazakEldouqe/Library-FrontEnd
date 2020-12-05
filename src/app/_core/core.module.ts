import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {httpInterceptorProviders} from './interceptors/http-interceptor-providers';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../_shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  providers: httpInterceptorProviders
})
export class CoreModule { }
