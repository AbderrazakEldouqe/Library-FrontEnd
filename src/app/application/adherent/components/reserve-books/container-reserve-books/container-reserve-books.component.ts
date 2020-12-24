import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {Book} from '../../../../../_core/models/book';
import {NotificationService} from '../../../../../_core/services/notification.service';
import {JsService} from '../../../../../_core/services/js.service';
import {AdherentService} from '../../../services/adherent.service';
import {BookService} from '../../../../book/services/book.service';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-container-reserve-books',
  templateUrl: './container-reserve-books.component.html',
  styleUrls: ['./container-reserve-books.component.css']
})
export class ContainerReserveBooksComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  books: Book[] = [];
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.books.length
  };

  tableSizes = [4, 8, 10, 14];
  filter = '';

  constructor(private adherentService: AdherentService,
              private bookService: BookService,
              private notification: NotificationService,
              private jsService: JsService) {
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    const obs1 = this.adherentService.getOnGoingReservations();
    const obs2 = this.bookService.getAll();
    this.subs.add(
      obs1.pipe(
        mergeMap(
          o1 => {
            return obs2.pipe(
              o2 => {
                if (o1.length > 0) {
                  const reservedIds = [];
                  o1.forEach(item => reservedIds.push(item.book.id));
                  return o2.pipe(
                    map((obj) => {
                      return obj.map((book: Book) => {
                        // return ({...a, reserved: false});
                        const check = reservedIds.includes(book.id);
                        return this.jsService.addElementToObject(book, 'reserved', check);
                      });
                    })
                  );
                }
                return o2;
              }
            );
          }
        )
      ).subscribe((res: Book[]) => {
        this.books = res;
      })
    );
  }

  reserveBook(book: Book): void {
    this.adherentService.reserve({book_id: book.id}).subscribe((res) => {
      this.notification.success(`${res?.message}`, '');
      this.getAllBooks();
    });
  }

  trackById(index, item): any {
    return item ? item.id : undefined;
  }

  onTableSizeChange(event): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
