import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Swal from 'sweetalert2';
import {Book} from '../../../../_core/models/book';
import mediumZoom from 'medium-zoom';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBooksComponent implements OnInit, OnChanges {

  @Input() books: Book[] = [];
  @Output() createEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() viewEvent = new EventEmitter();
  mz = mediumZoom('img');
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.books.length
  };

  tableSizes = [4, 8, 10, 14];

  filter = '';

  apiUrlImage = environment.apiImageUrl;

  constructor() {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.createEvent.emit(true);
  }

  edit(book: Book): void {
    this.editEvent.emit(book);
  }

  view(book: Book): void {
    this.viewEvent.emit(book);
  }

  delete(book: Book): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteEvent.emit(book);
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

  ngAfterViewInit() {
    // setTimeout(() => {
    //   mediumZoom('img');
    //   // alert('ok');
    // }, 10000);
    // mediumZoom('img');
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.mz.detach('img');
      this.mz = mediumZoom('img');
      // alert('ok');
    }, 10000);
  }
}
