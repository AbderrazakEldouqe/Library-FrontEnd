import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import { DashboardStatisticComponent } from './components/dashboard-statistic/dashboard-statistic.component';


@NgModule({
  declarations: [DashboardStatisticComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
