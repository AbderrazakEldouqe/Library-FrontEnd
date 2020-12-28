import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../_core/services/notification.service';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.css']
})
export class ResponseResetPasswordComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  form: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private notification: NotificationService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.token) {
        this.form.get('token').setValue(params.token);
      }
    });
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        token: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.password.bind(this)
      });
  }

  send(): void {
    this.subs.add(
      this.authService.resetPassword(this.form.value, {skip_token: 'true', /*skip_http_error_interceptor: 'true'*/})
        .subscribe((res: any) => this.handleResponse(res)
        )
    );
  }

  handleResponse(data: any): void {
    this.notification.success(`Password successfully changed .`, '');
    this.router.navigateByUrl('/auth/login');
  }

  password(formGroup: FormGroup): void | null {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    // console.log(password, confirmPassword);
    // return password === confirmPassword ? null : {passwordNotMatch: true};
    return password === confirmPassword ? null : formGroup.get('confirmPassword').setErrors({confirmPasswordMatch: true});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
