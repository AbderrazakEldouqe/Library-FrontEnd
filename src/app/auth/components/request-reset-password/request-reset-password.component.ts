import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../_core/services/notification.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  form: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  reset(): void {
    this.subs.add(
      this.authService.requestResetPassword(this.form.value, {skip_token: 'true', /*skip_http_error_interceptor: 'true'*/})
        .subscribe((res: any) => this.handleResponse(res)
        )
    );
  }

  handleResponse(data: any): void {
    this.notification.success(`Reset Email is send successfully, please check your inbox .`, '');
    this.router.navigateByUrl('/auth/login');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
