import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import {Language} from '../../../../_core/models/language';

@Component({
  selector: 'app-list-languages',
  templateUrl: './list-languages.component.html',
  styleUrls: ['./list-languages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListLanguagesComponent implements OnInit {

  @Input() languages: Language[] = [];
  @Output() createEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.languages.length
  };

  tableSizes = [4, 8, 10, 14];

  filter = '';
  constructor() {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.createEvent.emit(true);
  }

  edit(language: Language): void {
    this.editEvent.emit(language);
  }

  delete(language: Language): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteEvent.emit(language);
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

  onTableSizeChange(event): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }

}
