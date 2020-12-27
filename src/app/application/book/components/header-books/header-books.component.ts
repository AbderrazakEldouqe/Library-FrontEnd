import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-books',
  templateUrl: './header-books.component.html',
  styleUrls: ['./header-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderBooksComponent implements OnInit {

  @Input() name: string;
  @Input() option: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
