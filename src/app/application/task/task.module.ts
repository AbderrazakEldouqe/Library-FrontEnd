import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import { ContainerTasksComponent } from './components/container-tasks/container-tasks.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { FormAddEditTaskComponent } from './components/form-add-edit-task/form-add-edit-task.component';


@NgModule({
  declarations: [ContainerTasksComponent, ListTasksComponent, FormAddEditTaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule
  ]
})
export class TaskModule { }
