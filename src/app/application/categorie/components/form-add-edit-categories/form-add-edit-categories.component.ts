import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectionStrategy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../../_core/models/categorie';

@Component({
  selector: 'app-form-add-edit-categories',
  templateUrl: './form-add-edit-categories.component.html',
  styleUrls: ['./form-add-edit-categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAddEditCategoriesComponent implements OnInit, OnChanges {

  @Output() storeEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Input() categorie: Categorie = null;
  form: FormGroup;
  @Output() backToListEvent = new EventEmitter();

  constructor() {
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
    if (this.categorie) {
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
    if (this.categorie) {
      this.form.patchValue({
        name: this.categorie.name
      });
    }
  }

  update(): void {
    let updatedCategorie: any = this.form.value;
    updatedCategorie['id'] = this.categorie.id;
    this.updateEvent.emit(updatedCategorie);
    this.form.reset();
    this.categorie = null;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
  }
}
