import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, OnDestroy{
  editFieldController: string = 'collapse';
  editMode: boolean = false;
  editedId: number;
  editSub: Subscription;
  form: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      pomodoros: new FormControl(1)
    })
    this.editSub = this.taskService.editedTask.subscribe(taskData => {
      this.editFieldController = 'collapsed' 
      this.editMode = true;
      this.form.controls['name'].setValue(taskData.name)
      this.form.controls['pomodoros'].setValue(taskData.pomodoros)
      this.editedId = taskData.id;
    });
  }

  showEditField() {
    this.form.reset({name: null, pomodoros: 1})
    this.editFieldController == 'collapse' 
    ? this.editFieldController = 'collapsed'
    : this.editFieldController = 'collapse'
  }

  onAddTask(){
    this.taskService.addTask(this.form.value)
    this.onClose()
  }

  onEditTask(){
    this.taskService.onEditedTask(this.editedId, this.form.value);
    this.onClose()
  }

  onClose() {
    this.editFieldController = 'collapse' 
    this.editMode = false;
    this.form.reset({name: null, pomodoros: 1})
  }
  ngOnDestroy(): void {
    this.editSub.unsubscribe();
  }

}
