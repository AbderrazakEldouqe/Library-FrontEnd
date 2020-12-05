import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import {SharedModule} from '../_shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule
  ]
})
export class ApplicationModule { }
