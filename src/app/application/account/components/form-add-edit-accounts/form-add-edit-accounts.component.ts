import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Role} from '../../../../_core/models/role';
import {OnChanges} from '@angular/core';
import {Account} from '../../../../_core/models/account';
import {JsService} from '../../../../_core/services/js.service';

@Component({
  selector: 'app-form-add-edit-accounts',
  templateUrl: './form-add-edit-accounts.component.html',
  styleUrls: ['./form-add-edit-accounts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAddEditAccountsComponent implements OnInit, OnChanges {

  @Output() storeEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Input() account: Account;
  @Input() source: string = null;
  form: FormGroup;
  @Output() backToListEvent = new EventEmitter();

  constructor(private jsService: JsService) {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.source) {
      this.form.patchValue({
        role: this.getRoleIdBySourceAction(this.source)
      });
    }
    if (this.account) {
      this.form.patchValue({
        name: this.account.name,
        email: this.account.email,
        password: this.account.password,
        cin: this.account.cin
      });
    }
  }

  getRoleIdBySourceAction(source: string): Role.BIBLIOTHECAIRE | Role.ADHERENT {
    return source === 'biblio' ? Role.BIBLIOTHECAIRE : Role.ADHERENT;
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      cin: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.account) {
      this.update();
    } else {
      this.store();
    }
  }

  store(): void {
    this.storeEvent.emit(this.form.value);
    this.form.reset();
  }

  update(): void {
    const updatedAccount = this.jsService.addElementToObject(this.form.value, 'id', this.account.id);
    this.updateEvent.emit(updatedAccount);
    this.form.reset();
    this.account = null;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
  }
}
