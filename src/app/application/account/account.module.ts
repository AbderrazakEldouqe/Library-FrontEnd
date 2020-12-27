import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import {ContainerAccountsComponent} from './components/container-accounts/container-accounts.component';
import {ListAccountsComponent} from './components/list-accounts/list-accounts.component';
import {FormAddEditAccountsComponent} from './components/form-add-edit-accounts/form-add-edit-accounts.component';
import {HeaderAccountsComponent} from './components/header-accounts/header-accounts.component';
import {ListAccountsBiblioComponent} from './components/list-accounts-biblio/list-accounts-biblio.component';
import {ListAccountsAdherentComponent} from './components/list-accounts-adherent/list-accounts-adherent.component';
import {ListAccountsToApprouveComponent} from './components/list-accounts-to-approuve/list-accounts-to-approuve.component';


@NgModule({
  declarations: [ContainerAccountsComponent, ListAccountsComponent, FormAddEditAccountsComponent,
    HeaderAccountsComponent, ListAccountsBiblioComponent, ListAccountsAdherentComponent, ListAccountsToApprouveComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule {
}
