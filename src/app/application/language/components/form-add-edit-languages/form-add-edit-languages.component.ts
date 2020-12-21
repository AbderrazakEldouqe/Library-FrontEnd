import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Language} from '../../../../_core/models/language';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JsService} from '../../../../_core/services/js.service';

@Component({
  selector: 'app-form-add-edit-languages',
  templateUrl: './form-add-edit-languages.component.html',
  styleUrls: ['./form-add-edit-languages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAddEditLanguagesComponent implements OnInit, OnChanges {

  @Output() storeEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Input() language: Language = null;
  form: FormGroup;
  @Output() backToListEvent = new EventEmitter();

  constructor(private jsService: JsService) {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.language) {
      this.update();
    } else {
      this.store();
    }
  }

  store(): void {
    this.storeEvent.emit(this.form.value);
    this.form.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.language) {
      this.form.patchValue({
        name: this.language.name
      });
    }
  }

  update(): void {
    const updatedLanguage = this.jsService.addElementToObject(this.form.value, 'id', this.language.id);
    this.updateEvent.emit(updatedLanguage);
    this.form.reset();
    this.language = null;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
  }

}
