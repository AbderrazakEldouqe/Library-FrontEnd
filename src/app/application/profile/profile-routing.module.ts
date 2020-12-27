import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContainerProfileComponent} from './components/container-profile/container-profile.component';

const routes: Routes = [
  {path: '', component: ContainerProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
