import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import { DashboardStatisticComponent } from './components/dashboard-statistic/dashboard-statistic.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [DashboardStatisticComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule
  ]
})
export class DashboardModule { }
