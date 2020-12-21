import {Injectable} from '@angular/core';
import {DataService} from '../../../_core/services/data.service';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends DataService {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/users`, http);
  }

  getAll(roleId, headersObject: {} = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}/usersByRole/${roleId}`, {headers: headersObject});
  }

  getAdherentAccountsToApprove(headersObject: {} = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}/accountsToApprove`, {headers: headersObject});
  }

  disableEnableAccount(resource: any, headersObject: {} = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/disableEnableAccount`, resource, {headers: headersObject});
  }

  approveAccount(resource: any, headersObject: {} = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/approveAccount`, resource, {headers: headersObject});
  }
}
