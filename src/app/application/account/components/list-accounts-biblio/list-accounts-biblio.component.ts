import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Account} from '../../../../_core/models/account';
import Swal from 'sweetalert2';
import {ActionsAccountService} from '../../services/actions-account.service';

@Component({
  selector: 'app-list-accounts-biblio',
  templateUrl: './list-accounts-biblio.component.html',
  styleUrls: ['./list-accounts-biblio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAccountsBiblioComponent implements OnInit {

  @Input() biblioAccounts: Account[] = [];
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.biblioAccounts.length
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';

  constructor(private actionsAccountServices: ActionsAccountService) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.actionsAccountServices.emitRequest({action: 'create', source: 'biblio', data: null});
  }

  edit(account: Account): void {
    this.actionsAccountServices.emitRequest({action: 'edit', source: 'biblio', data: account});
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
        this.actionsAccountServices.emitRequest({action: 'delete', source: 'biblio', data: account});
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
