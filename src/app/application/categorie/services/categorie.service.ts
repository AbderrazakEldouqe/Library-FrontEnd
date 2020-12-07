import { Injectable } from '@angular/core';
import {DataService} from '../../../_core/services/data.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService extends DataService {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/categories`, http);
  }
}
