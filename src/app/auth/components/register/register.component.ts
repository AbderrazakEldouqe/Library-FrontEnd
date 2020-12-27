import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../../_core/services/notification.service';
import {SubSink} from 'subsink';
import {JsService} from '../../../_core/services/js.service';
import {Role} from '../../../_core/models/role';
import {ErrorValidationServerService} from '../../../_core/services/errors/error-validation-server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  registerForm: FormGroup;
  errorsServer: any;

  constructor(private authService: AuthService,
              private notification: NotificationService,
              private jsService: JsService,
              private router: Router,
              private errorValidationServerService: ErrorValidationServerService) {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
    this.handleErrorsValidationServer();
  }

  initialFormGroupe(): void {
    this.registerForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        cin: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        role: new FormControl(Role.ADHERENT)
      },
      {
        validators: this.password.bind(this)
      });
  }

  handleErrorsValidationServer(): void {
    this.subs.add(
      this.errorValidationServerService.responseValidationServer.subscribe(validationErrors => {
        this.errorValidationServerService.setErrorsToFormGroup(validationErrors, this.registerForm);
      })
    );
  }

  register(): void {
    console.log(this.registerForm.value);
    this.errorsServer = null;
    this.subs.add(
      this.authService.register(this.registerForm.value, {skip_token: 'true', /*skip_http_error_interceptor: 'true'*/})
        .subscribe((res: any) => this.handleResponse(res),
          // (err: AppError) => this.handleError(err)
        )
    );
  }

  handleResponse(data: any): void {
    this.notification.success(`Bienvenu : ${this.registerForm.get('name').value}`, 'Vous compte a éte bien crée !');
    this.router.navigateByUrl('/auth');
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
