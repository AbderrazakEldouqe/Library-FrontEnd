import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TokenService} from '../../services/token.service';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private accountService: AccountService,
              private router: Router,
              private notification: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      const skipIntercept = request.headers.has('skip_token');
      if (skipIntercept) {
        return next.handle(request);
      }
      if ([401, 403].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.tokenService.remove();
        this.accountService.changeStatus(false);
        this.notification.error('Please Reconnect !', '');
        this.router.navigateByUrl('/auth/login');
        // location.reload(true);
      }

      // const error = err.error.message || err.statusText;
      return throwError(err);
    }));
  }
}
