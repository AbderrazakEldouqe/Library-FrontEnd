import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SpinnerInterceptor} from './spinner.interceptor';
import {JwtInterceptor} from './jwt.interceptor';
import {UnauthorizedInterceptor} from './errors/unauthorized.interceptor';
import {HttpErrorInterceptor} from './errors/http-error.interceptor';
import {GlobalErrorHandler} from './errors/global-error-handler';
import {ErrorHandler} from '@angular/core';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },{
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthorizedInterceptor,
    multi: true
  }
];
