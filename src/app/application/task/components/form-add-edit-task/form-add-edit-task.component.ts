import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../../../_core/models/task';

@Component({
  selector: 'app-form-add-edit-task',
  templateUrl: './form-add-edit-task.component.html',
  styleUrls: ['./form-add-edit-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAddEditTaskComponent implements OnInit, OnChanges {

  @Output() storeEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Input() task: Task = null;
  form: FormGroup;
  @Output() backToListEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.task) {
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
    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description
      });
    }
  }

  update(): void {
    let updatedTask: any = this.form.value;
    updatedTask['id'] = this.task.id;
    this.updateEvent.emit(updatedTask);
    this.form.reset();
    this.task = null;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
  }
}
