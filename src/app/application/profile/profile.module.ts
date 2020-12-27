import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ContainerProfileComponent } from './components/container-profile/container-profile.component';
import { HeaderProfileComponent } from './components/header-profile/header-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {SharedModule} from '../../_shared/shared.module';


@NgModule({
  declarations: [ContainerProfileComponent, HeaderProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
