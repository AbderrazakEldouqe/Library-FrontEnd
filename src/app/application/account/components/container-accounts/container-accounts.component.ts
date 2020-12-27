import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {NotificationService} from '../../../../_core/services/notification.service';
import {AccountService} from '../../services/account.service';
import {Role} from '../../../../_core/models/role';
import {Account} from '../../../../_core/models/account';
import {ActionsAccountService} from '../../services/actions-account.service';
import {JsService} from '../../../../_core/services/js.service';

@Component({
  selector: 'app-container-accounts',
  templateUrl: './container-accounts.component.html',
  styleUrls: ['./container-accounts.component.css']
})
export class ContainerAccountsComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  biblioAccounts: Account[] = [];
  adherentAccounts: Account[] = [];
  toApproveAccounts: Account[] = [];
  formIsShow = false;
  selectedAccount: Account = null;
  source: string = null;

  constructor(private accountService: AccountService,
              private notification: NotificationService,
              private actionsAccountServices: ActionsAccountService,
              private jsService: JsService) {
  }

  ngOnInit(): void {
    this.getAllBibliothecairesAccounts();
    this.getAllAdherentsAccounts();
    this.getAllToApproveAccounts();
    this.subs.add(
      this.actionsAccountServices.requestActionsAccount.subscribe((req) => {
        this.handleActions(req);
      }));
  }

  handleActions(req: any): void {
    this.source = req.source;
    if (req.action === 'create') {
      this.showForm();
    } else if (req.action === 'edit') {
      this.edit(req.data);
    } else if (req.action === 'delete') {
      this.delete(req.data);
    } else if (req.action === 'active') {
      this.disableEnableAccount(req.data.id);
    } else if (req.action === 'approve') {
      this.approveAccount(req.data.id);
    }
  }

  getAllBibliothecairesAccounts(): void {
    this.subs.add(
      this.accountService.getAll(Role.BIBLIOTHECAIRE).subscribe((res: Account[]) => {
        this.biblioAccounts = res;
      })
    );
  }

  getAllAdherentsAccounts(): void {
    this.subs.add(
      this.accountService.getAll(Role.ADHERENT).subscribe((res: Account[]) => {
        this.adherentAccounts = res;
      })
    );
  }

  getAllToApproveAccounts(): void {
    this.subs.add(
      this.accountService.getAdherentAccountsToApprove().subscribe((res: Account[]) => {
        this.toApproveAccounts = res;
      })
    );
  }

  showForm(): void {
    this.formIsShow = true;
  }

  backToList(): void {
    this.selectedAccount = null;
    this.source = null;
    this.formIsShow = false;
  }

  store(account: Account): void {
    this.subs.add(
      this.accountService.create(account).subscribe((res: Account) => {
        this.handleResponseStore(res);
      })
    );
  }

  handleResponseStore(data: Account): void {
    if (this.source === 'biblio') {
      this.biblioAccounts = this.jsService.spread(this.biblioAccounts, data);
    } else {
      this.adherentAccounts = this.jsService.spread(this.adherentAccounts, data);
    }
    this.notification.success('Account bien crée !', 'bien crée !');
    this.formIsShow = false;
    this.source = null;
    this.selectedAccount = null;
  }

  edit(account: Account): void {
    this.selectedAccount = this.jsService.objectAssign(account);
    this.showForm();
  }

  update(account: Account): void {
    const id = account.id;
    account = this.jsService.deleteElementFromObjectByKey(account, 'id');
    this.subs.add(
      this.accountService.update(id, account).subscribe((res: Account) => {
        this.handleResponseUpdate(res);
      })
    );
  }

  handleResponseUpdate(data: Account): void {
    if (this.source === 'biblio') {
      this.biblioAccounts = this.jsService.modifyObjectElementFromArrayByKey(this.biblioAccounts, data, 'id');
    } else {
      this.adherentAccounts = this.jsService.modifyObjectElementFromArrayByKey(this.adherentAccounts, data, 'id');
    }
    this.notification.success(`Account bien Modfiee !`, 'bien Modfiee !');
    this.formIsShow = false;
    this.source = null;
    this.selectedAccount = null;
  }


  delete(account: Account): void {
    const id = account.id;
    this.subs.add(
      this.accountService.delete(id).subscribe((res: Account) => {
        this.handleResponseDelete(account);
      })
    );
  }

  handleResponseDelete(data: Account): void {
    if (this.source === 'biblio') {
      this.biblioAccounts = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.biblioAccounts, data, 'id'));
    } else {
      this.adherentAccounts = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.adherentAccounts, data, 'id'));
    }
    this.notification.success(`Account bien supprimer !`, 'bien supprimer !');
  }

  disableEnableAccount(userId: any): void {
    this.subs.add(
      this.accountService.disableEnableAccount({userId}).subscribe((res => {
        this.notification.success(`${res.message}`, '');
      }))
    );
  }

  approveAccount(userId: any): void {
    this.subs.add(
      this.accountService.approveAccount({userId}).subscribe(((res: Account) => {
        this.handleResponseApprove(res);
      }))
    );
  }

  handleResponseApprove(data: Account): void {
    this.toApproveAccounts = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.toApproveAccounts, data, 'id'));
    this.adherentAccounts = this.jsService.spread(this.adherentAccounts, data);
    this.notification.success(`Account bien Approuved !`, 'bien Approuved !');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
