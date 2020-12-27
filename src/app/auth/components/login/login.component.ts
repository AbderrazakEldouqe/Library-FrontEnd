import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../../_core/services/token.service';
import {AccountService} from '../../../_core/services/account.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../_core/services/notification.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private accountService: AccountService,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)])
    });
  }

  login(): void {
    console.log(this.loginForm.value);
    this.subs.add(
      this.authService.login(this.loginForm.value, {skip_token: 'true', /*skip_http_error_interceptor: 'true'*/})
        .subscribe((res: any) => this.handleResponse(res),
          // (err: any) => this.handleError(err)
        )
    );
  }

  handleResponse(data: any): void {
    this.tokenService.handle(data);
    this.accountService.changeStatus(true);
    console.log('info', this.tokenService.getInfos());
    this.notification.success(`Bienvenu : ${this.tokenService.getInfos().name}`, 'Vous êtes connectés !');
    this.router.navigateByUrl('/application');
  }

  handleError(error: any): void {
    if (error.status === 403) {
      this.notification.error(`${error?.error?.message}`, ``);
    } else {
      this.notification.error('Merci de Vérifier votre email ou mot de passe !', ``);
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
