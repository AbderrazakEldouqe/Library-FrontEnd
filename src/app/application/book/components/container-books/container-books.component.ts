import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {NotificationService} from '../../../../_core/services/notification.service';
import {Book} from '../../../../_core/models/book';
import {BookService} from '../../services/book.service';
import {JsService} from '../../../../_core/services/js.service';

@Component({
  selector: 'app-container-books',
  templateUrl: './container-books.component.html',
  styleUrls: ['./container-books.component.css']
})
export class ContainerBooksComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  books: Book[] = [];
  formIsShow = false;
  selectedBook: Book = null;
  viewBook = false;

  constructor(private bookService: BookService,
              private notification: NotificationService,
              private jsService: JsService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.subs.add(
      this.bookService.getAll().subscribe((res: Book[]) => {
        this.books = res;
      })
    );
  }

  showForm(): void {
    this.formIsShow = true;
  }

  backToList(): void {
    this.selectedBook = null;
    this.formIsShow = false;
    this.viewBook = false;
  }

  store(book): void {
    this.subs.add(
      this.bookService.create(book).subscribe((res: Book) => {
        this.handleResponseStore(res);
      })
    );
  }

  handleResponseStore(data: Book): void {
    this.books = this.jsService.spread(this.books, data);
    this.notification.success('Book bien crée !', 'bien crée !');
    this.formIsShow = false;
  }


  edit(book: Book): void {
    this.selectedBook = this.jsService.objectAssign(book);
    this.showForm();
  }

  update(book): void {
    const id = book.get('id');
    this.subs.add(
      this.bookService.update(id, book).subscribe((res: Book) => {
        this.handleResponseUpdate(res);
      })
    );
  }

  handleResponseUpdate(data: Book): void {
    this.books = this.jsService.modifyObjectElementFromArrayByKey(this.books, data, 'id');
    this.notification.success(`Book bien Modfiee !`, 'bien Modfiee !');
    this.formIsShow = false;
  }


  delete(book: Book): void {
    const id = book.id;
    this.subs.add(
      this.bookService.delete(id).subscribe((res: Book) => {
        this.handleResponseDelete(book);
      })
    );
  }

  handleResponseDelete(data: Book): void {
    this.books = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.books, data, 'id'));
    this.notification.success(`Book bien supprimer !`, 'bien supprimer !');
  }

  view(book: Book): void {
    this.selectedBook = this.jsService.objectAssign(book);
    this.viewBook = true;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
