import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Account} from '../../../../_core/models/account';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAccountsComponent implements OnInit {

  @Input() biblioAccounts: Account[] = [];
  @Input() adherentAccounts: Account[] = [];
  @Input() toApproveAccounts: Account[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
