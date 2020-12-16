import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../_core/models/book';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBookComponent implements OnInit {

  @Input() book: Book = null;
  @Output() backToListEvent = new EventEmitter();
  apiUrlImage = environment.apiImageUrl;

  constructor() {
  }

  ngOnInit(): void {
  }

  back(): void {
    this.backToListEvent.emit();
  }
}
