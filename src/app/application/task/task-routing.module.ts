import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContainerTasksComponent} from './components/container-tasks/container-tasks.component';

const routes: Routes = [
  {path: '', component: ContainerTasksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
