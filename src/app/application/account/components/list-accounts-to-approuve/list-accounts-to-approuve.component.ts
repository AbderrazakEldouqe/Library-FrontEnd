import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Account} from '../../../../_core/models/account';
import {ActionsAccountService} from '../../services/actions-account.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-list-accounts-to-approuve',
  templateUrl: './list-accounts-to-approuve.component.html',
  styleUrls: ['./list-accounts-to-approuve.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAccountsToApprouveComponent implements OnInit {

  @Input() toApproveAccounts: Account[] = [];
  private subs = new SubSink();

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.toApproveAccounts.length
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';

  constructor(private actionsAccountServices: ActionsAccountService) {
  }

  ngOnInit(): void {
  }

  approve(account: Account): void {
    this.actionsAccountServices.emitRequest({action: 'approve', source: 'toApprove', data: account});
  }

  trackById(index, item): any {
    return item ? item.id : undefined;
  }

  onTableSizeChange(event): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }
}
