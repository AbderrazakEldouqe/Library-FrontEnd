import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const skipIntercept = request.headers.has('skip_token');
    if (skipIntercept) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`,
        /*'Content-Type': 'application/json',*/
        role_id: this.tokenService.getRoleId(),
        navigation_version: this.tokenService.getNavigationVersion()
      }
    });

    // if (request.headers.has('Content-Type')) {
    //   contentType = request.headers.get('Content-Type');
    // }
    // console.log('content', contentType);
    return next.handle(request);
  }
}
