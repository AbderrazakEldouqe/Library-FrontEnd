import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {NotFoundError} from '../../../_shared/exceptions/not-found-error';
import {BadInputError} from '../../../_shared/exceptions/bad-input-error';
import {AppError} from '../../../_shared/exceptions/app-error';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipIntercept = request.headers.has('skip_http_error_interceptor');
    if (skipIntercept) {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let err;
    if (error.status === 404) {
      err = new NotFoundError(error);
    } else if (error.status === 400) {
      err = new BadInputError(error);
    } else {
      err = new AppError(error);
    }
    return throwError(err);
  }
}
