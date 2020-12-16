import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {DataService} from '../../../_core/services/data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService extends DataService {

  constructor(public http: HttpClient) {
    super(`${environment.apiUrl}/books`, http);
  }

  update(id: any, resource: any, headersObject: {} = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/books/${id}`, resource, {headers: headersObject});
  }
}
