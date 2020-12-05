import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {tap} from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    return this.handler(next, request);
  }

  handler(next, request): any {
    return next.handle(request)
      .pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              this.spinner.hide();
            }
          },
          (error: HttpErrorResponse) => {
            this.spinner.hide();
            throw error;
          }
        )
      );
  }
}
