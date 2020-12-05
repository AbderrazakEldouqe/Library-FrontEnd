import {Injectable} from '@angular/core';
import {NavigationService} from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends NavigationService {

  constructor() {
    super();
  }

  set(data: any): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('role_id', data.role_id);
    this.setNavigation(data);
  }

  handle(data: any): void {
    this.set(data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getId(): string | null {
    return localStorage.getItem('id');
  }

  remove(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role_id');
    this.removeNavigations();
  }

  decode(payload: any): any {
    return JSON.parse(atob(payload));
  }

  payload(token: any): any {
    const payload = token.split('.')[1];
    console.log('payload', payload);
    return this.decode(payload);
  }

  isValid(): boolean {
    const token = this.getToken();
    const id = this.getId();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return id === payload.id;
      }
    }
    return false;
  }

  getInfos(): any {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }
    return null;
  }

  loggedIn(): boolean {
    return this.isValid();
  }
}
