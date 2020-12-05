import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../_core/services/token.service';
import {AccountService} from '../../_core/services/account.service';
import {Router, RouterOutlet} from '@angular/router';
import {slider} from '../../_core/animations/route-animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [slider]
})
export class LayoutComponent implements OnInit {

  currentUser: { name: '' };
  public loggedIn = false;
  navigations: any[] = [];

  constructor(private tokenService: TokenService,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe(res => {
      this.loggedIn = res;
      this.currentUser = this.tokenService.getInfos();
      this.navigations = this.tokenService.getNavigation();
      console.log('nav', this.navigations);
    });
  }

  logout(): void {
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.router.navigateByUrl('/auth/login');
  }

  prepareRoute(outlet: RouterOutlet): any {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animation
    );
  }
}
