import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationsComponent implements OnInit, AfterViewInit {
  @Input() idPagination = null;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  pageChanged(event): void {
    this.pageChange.emit(event);
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
