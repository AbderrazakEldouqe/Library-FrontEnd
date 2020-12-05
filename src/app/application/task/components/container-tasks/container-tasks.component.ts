import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../../../_core/models/task';
import {TaskService} from '../../services/task.service';
import {NotificationService} from '../../../../_core/services/notification.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-container-tasks',
  templateUrl: './container-tasks.component.html',
  styleUrls: ['./container-tasks.component.css']
})
export class ContainerTasksComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  tasks: Task[] = [];
  formIsShow = false;
  selectedTask: Task = null;

  constructor(private taskService: TaskService,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.subs.add(
      this.taskService.getAll().subscribe((res: Task[]) => {
        this.tasks = res;
      })
    );
  }

  showForm(): void {
    this.formIsShow = true;
  }

  backToList(): void {
    this.selectedTask = null;
    this.formIsShow = false;
  }

  store(task: Task): void {
    this.subs.add(
      this.taskService.create(task).subscribe((res: Task) => {
        this.handleResponseStore(res);
      })
    );
  }

  handleResponseStore(data: Task): void {
    this.tasks = [data, ...this.tasks];
    this.notification.success('Task bien crée !', 'bien crée !');
    this.formIsShow = false;
  }


  edit(task: Task): void {
    this.selectedTask = Object.assign({}, task);
    this.showForm();
  }

  update(task: Task): void {
    const id = task.id;
    delete task.id;
    this.subs.add(
      this.taskService.update(id, task).subscribe((res: Task) => {
        this.handleResponseUpdate(res);
      })
    );
  }

  handleResponseUpdate(data: Task): void {
    this.tasks = this.tasks.map(task => {
      if (data.id === task.id) {
        task = data;
      }
      return task;
    });
    this.notification.success(`Task bien Modfiee !`, 'bien Modfiee !');
    this.formIsShow = false;
  }


  delete(task: Task): void {
    const id = task.id;
    this.subs.add(
      this.taskService.delete(id).subscribe((res: Task) => {
        this.handleResponseDelete(task);
      })
    );
  }

  handleResponseDelete(data: Task): void {
    const index = this.tasks.findIndex((item, i) => {
      return data.id === item.id;
    });
    this.tasks.splice(index, 1);
    this.notification.success(`Task bien supprimer !`, 'bien supprimer !');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
