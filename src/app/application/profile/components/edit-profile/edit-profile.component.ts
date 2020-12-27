import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {Account} from '../../../../_core/models/account';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Role} from '../../../../_core/models/role';
import {JsService} from '../../../../_core/services/js.service';
import {ErrorValidationServerService} from '../../../../_core/services/errors/error-validation-server.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnChanges, OnDestroy {

  private subs = new SubSink();
  @Input() currentUser: Account = null;
  @Output() updateEvent = new EventEmitter();
  userInfoForm: FormGroup;
  userResetPasswordForm: FormGroup;

  constructor(private jsService: JsService,
              private errorValidationServerService: ErrorValidationServerService) {
  }

  ngOnInit(): void {
    this.initialUserInfoFormGroupe();
    this.initialUserResetPasswordFormGroupe();
    this.handleErrorsValidationServer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentUser) {
      this.userInfoForm.patchValue({
          name: this.currentUser.name,
          cin: this.currentUser.cin,
          phone_number: this.currentUser.phone_number,
          email: this.currentUser.email
        }
      );
    }
  }

  initialUserInfoFormGroupe(): void {
    this.userInfoForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cin: new FormControl(null, [Validators.required]),
      phone_number: new FormControl(null, [Validators.required, Validators.pattern('^((\\+212-?)|0)?[0-9]{9}$')]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  initialUserResetPasswordFormGroupe(): void {
    this.userResetPasswordForm = new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)])
      },
      {
        validators: this.password.bind(this)
      });
  }

  handleErrorsValidationServer(): void {
    this.subs.add(
      this.errorValidationServerService.responseValidationServer.subscribe(validationErrors => {
        this.errorValidationServerService.setErrorsToFormGroup(validationErrors, this.userInfoForm);
      })
    );
  }

  password(formGroup: FormGroup): void | null {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    // console.log(password, confirmPassword);
    // return password === confirmPassword ? null : {passwordNotMatch: true};
    return password === confirmPassword ? null : formGroup.get('confirmPassword').setErrors({confirmPasswordMatch: true});
  }

  updateUserInfo(): void {
    const updatedUser = this.jsService.addElementToObject(this.userInfoForm.value, 'id', this.currentUser.id);
    this.updateEvent.emit(updatedUser);
  }

  updateUserResetPassword(): void {
    const updatedUser = this.jsService.addElementToObject(this.userResetPasswordForm.value, 'id', this.currentUser.id);
    this.updateEvent.emit(updatedUser);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
