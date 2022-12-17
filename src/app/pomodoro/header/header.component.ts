import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService, timer } from '../task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  editSettingsController: string = 'row collapse';
  currentTimeSettings: timer;
  timerSettingsForm: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.currentTimeSettings = this.taskService.getTime();
    this.timerSettingsForm = new FormGroup({
      shortBreak: new FormControl(this.currentTimeSettings.shortBreak, Validators.required),
      longBreak: new FormControl(this.currentTimeSettings.longBreak, Validators.required),
      pomodoro: new FormControl(this.currentTimeSettings.pomodoro, Validators.required)
    });
  }

  showSettingsField() {
    this.editSettingsController == 'row collapse' 
    ? this.editSettingsController = 'row collapsed'
    : this.editSettingsController = 'row collapse'
  }

  onConfigure(){
    this.taskService.time = {
      shortBreak: this.timerSettingsForm.controls['shortBreak'].value,
      longBreak: this.timerSettingsForm.controls['longBreak'].value,
      pomodoro: this.timerSettingsForm.controls['pomodoro'].value,
    }
    this.taskService.timerChanged.next(this.taskService.time)
    this.editSettingsController = 'row collapse';
  }

}
