import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../task.moodel';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {
  @Input() task: Task;
  isMenuVisible: boolean =  false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  onSelectTask(){
    this.taskService.onSelectTask(this.task)
  }

  onDeleTask() {
    this.taskService.deleteTask(this.task.id)
  }

  onEditTask() {
    this.taskService.editedTask.next(this.task)
    this.isMenuVisible = false
  }

  showMenu() {
    if(this.isMenuVisible) {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
      setTimeout(() => {
        this.isMenuVisible = false
      }, 5000);
    }
  }

}
