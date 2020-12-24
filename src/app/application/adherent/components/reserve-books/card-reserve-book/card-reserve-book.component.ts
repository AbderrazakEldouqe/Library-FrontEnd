import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {Book} from '../../../../../_core/models/book';

@Component({
  selector: 'app-card-reserve-book',
  templateUrl: './card-reserve-book.component.html',
  styleUrls: ['./card-reserve-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardReserveBookComponent implements OnInit {
  @Input() book: Book;
  @Output() reserveBookEvent = new EventEmitter();
  apiUrlImage = environment.apiImageUrl;

  constructor() {
  }

  ngOnInit(): void {
  }

  reserve(book: Book): void {
    this.reserveBookEvent.emit(book);
  }
}
