import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';
import {AccountService} from '../services/account.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService,
              private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (next.data.roles && next.data.roles.indexOf(this.tokenService.getRoleId()) === -1) {
      this.tokenService.remove();
      this.accountService.changeStatus(false);
      this.toastr.error(
        ` `,
        'Please Reconnect !',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-left'
        }
      );
      this.router.navigateByUrl('/auth/login');
      return false;
    }

    return true;
  }

}
