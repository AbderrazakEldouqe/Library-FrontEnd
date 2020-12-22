import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContainerReservationsComponent} from './components/container-reservations/container-reservations.component';

const routes: Routes = [
  {path: '', component: ContainerReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
