import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdherentRoutingModule} from './adherent-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import {ContainerReserveBooksComponent} from './components/reserve-books/container-reserve-books/container-reserve-books.component';
import {CardReserveBookComponent} from './components/reserve-books/card-reserve-book/card-reserve-book.component';
import {HeaderAdherentComponent} from './components/header-adherent/header-adherent.component';
import {ContainerListMyReservationsComponent} from './components/my-reservations/container-list-my-reservations/container-list-my-reservations.component';
import {ListMyReservationsComponent} from './components/my-reservations/list-my-reservations/list-my-reservations.component';


@NgModule({
  declarations: [
    ContainerReserveBooksComponent, CardReserveBookComponent,
    HeaderAdherentComponent, ContainerListMyReservationsComponent,
    ListMyReservationsComponent
  ],
  imports: [
    CommonModule,
    AdherentRoutingModule,
    SharedModule
  ]
})
export class AdherentModule {
}
