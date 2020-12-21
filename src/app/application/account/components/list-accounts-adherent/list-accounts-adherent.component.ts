import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from '../../../../_core/models/account';
import Swal from 'sweetalert2';
import {SubSink} from 'subsink';
import {ActionsAccountService} from '../../services/actions-account.service';

@Component({
  selector: 'app-list-accounts-adherent',
  templateUrl: './list-accounts-adherent.component.html',
  styleUrls: ['./list-accounts-adherent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAccountsAdherentComponent implements OnInit {

  @Input() adherentAccounts: Account[] = [];
  private subs = new SubSink();
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.adherentAccounts.length
  };

  tableSizes = [4, 8, 10, 14];

  filter = '';

  constructor(private actionsAccountServices: ActionsAccountService) {
  }


  ngOnInit(): void {
    this.subs.add(
      this.actionsAccountServices.responseActionsAccount.subscribe((res) => {
        if (res.source === 'adherent') {
          console.log('res adherent', res);
        }
      }));
  }

  create(): void {
    this.actionsAccountServices.emitRequest({action: 'create', source: 'adherent', data: null});
  }

  edit(account: Account): void {
    this.actionsAccountServices.emitRequest({action: 'edit', source: 'adherent', data: account});
  }

  delete(account: Account): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.actionsAccountServices.emitRequest({action: 'delete', source: 'adherent', data: account});
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

  activechanged(account: Account): void {
    this.actionsAccountServices.emitRequest({action: 'active', source: 'biblio', data: account});
  }
}
