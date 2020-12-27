import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReservationRoutingModule} from './reservation-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import {ContainerReservationsComponent} from './components/container-reservations/container-reservations.component';
import {ListReservationsComponent} from './components/list-reservations/list-reservations.component';
import {ListReservationsAllComponent} from './components/list-reservations-all/list-reservations-all.component';
import {ListReservationsRetardRetourComponent} from './components/list-reservations-retard-retour/list-reservations-retard-retour.component';
import {HeaderReservationsComponent} from './components/header-reservations/header-reservations.component';


@NgModule({
  declarations: [ContainerReservationsComponent, ListReservationsComponent, ListReservationsAllComponent,
    ListReservationsRetardRetourComponent, HeaderReservationsComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule
  ]
})
export class ReservationModule {
}
