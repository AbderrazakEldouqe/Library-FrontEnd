import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../_core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  login(data: { email: string, password: string }, headersObject = {}): Observable<object> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data, {headers: headersObject});
  }

  register(data: User, headersObject = {}): Observable<object> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data, {headers: headersObject});
  }

  requestResetPassword(data, headersObject = {}): Observable<object> {
    return this.http.post(`${environment.apiUrl}/auth/sendPasswordResetLink`, data, {headers: headersObject});
  }

  resetPassword(data, headersObject = {}): Observable<object> {
    return this.http.post(`${environment.apiUrl}/auth/resetPassword`, data, {headers: headersObject});
  }
}
