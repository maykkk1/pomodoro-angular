import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../task.moodel';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  sub: Subscription;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks()
    this.sub = this.taskService.tasksChanged
      .subscribe(newTasks => { this.tasks = newTasks })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
