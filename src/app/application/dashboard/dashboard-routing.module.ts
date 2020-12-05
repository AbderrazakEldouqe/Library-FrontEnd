import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardStatisticComponent} from './components/dashboard-statistic/dashboard-statistic.component';

const routes: Routes = [
  {path: '', component: DashboardStatisticComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
