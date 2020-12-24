import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContainerReserveBooksComponent} from './components/reserve-books/container-reserve-books/container-reserve-books.component';
import {ContainerListMyReservationsComponent} from './components/my-reservations/container-list-my-reservations/container-list-my-reservations.component';

const routes: Routes = [
  {path: '', component: ContainerReserveBooksComponent},
  {path: 'reserveBooks', component: ContainerReserveBooksComponent},
  {path: 'myReservation', component: ContainerListMyReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdherentRoutingModule {
}
