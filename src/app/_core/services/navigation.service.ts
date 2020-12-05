import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() {
  }

  setNavigation(data: any): void {
    localStorage.setItem('navigation_version', data.navigation_version);
    localStorage.setItem('navigations', JSON.stringify(data.navigations));
  }

  getNavigation(): any {
    return JSON.parse(localStorage.getItem('navigations'));
  }

  getNavigationVersion(): string {
    return localStorage.getItem('navigation_version');
  }

  removeNavigations(): void {
    localStorage.removeItem('navigation_version');
    localStorage.removeItem('navigations');
  }

  getRoleId(): string {
    return localStorage.getItem('role_id');
  }
}
