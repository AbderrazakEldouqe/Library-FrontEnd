import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../../_core/models/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTasksComponent implements OnInit {

  @Input() tasks: Task[] = [];
  @Output() createEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.createEvent.emit(true);
  }

  edit(task: Task): void {
    this.editEvent.emit(task);
  }

  delete(task: Task): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteEvent.emit(task);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }

  trackById(index, item): any {
    return item ? item.id : undefined;
  }
}

