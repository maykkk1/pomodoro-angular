import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { clearInterval, setInterval } from 'worker-timers';
import { Task } from '../task.moodel';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  currentTask: Task;
  isTimerStarted: boolean = false;
  isTaskSelected: boolean = false;
  completePomodoCycle: boolean;
  isPomodoroTime: boolean;
  isRestTime: boolean;


  minutes: number;
  seconds: number = 0;
  pomodoros: number;


  timer: any;
  taskSub: Subscription;

  constructor(private taskService: TaskService, private titleService: Title) { }

  ngOnInit(): void {
    this.taskSub = this.taskService.selectTask.subscribe(taskData => {
      this.currentTask = taskData;
      this.pomodoros = taskData.pomodoros;
      this.resetTimer()
      this.SetToPomodoroTime()
      this.isPomodoroTime = true;
      if(taskData.pomodoros == 4) this.completePomodoCycle = true;
      if(this.isTimerStarted) this.stopTimer()
      this.isTaskSelected = true;
    })
  }

  startTimer() {
    this.isTimerStarted = true;
    this.timer = setInterval(() => {
      this.titleService
      .setTitle(`${this.minutes < 10 ? '0': ''}${this.minutes}:${this.seconds < 10 ? '0': ''}${this.seconds == 0 ? 0 : this.seconds - 1}`)
    if(this.seconds == 0) {
      if(this.minutes == 0) {
        if(this.isPomodoroTime) {
          return this.currentPomodoroEnded()
        } else {
          return this.currentRestEnded()
        }
      } else {
        this.seconds = 59;
        return this.minutes--
      }
    }
    return this.seconds--
    }, 1)
  }

  stopTimer(){
    this.isTimerStarted = false;
    clearInterval(this.timer)
  }

  timerControl(){
    this.isTimerStarted 
    ? this.stopTimer()
    : this.startTimer()
  }

  resetTimer(){
    this.minutes = 25;
    this.seconds = 0;
  }

  SetToPomodoroTime(){
    this.minutes = 25
    this.titleService
      .setTitle(`${this.minutes < 10 ? '0': ''}${this.minutes}:${this.seconds < 10 ? '0': ''}${this.seconds == 0 ? 0 : this.seconds - 1}`)
  }

  SetToRestTime() {
    if(this.pomodoros == 0 && this.completePomodoCycle) {
      this.minutes = 15
    } else {
      this.minutes = 5
    }
    this.titleService
      .setTitle(`${this.minutes < 10 ? '0': ''}${this.minutes}:${this.seconds < 10 ? '0': ''}${this.seconds == 0 ? 0 : this.seconds - 1}`)
  }

  currentPomodoroEnded() {
    this.pomodoros--
    this.stopTimer()
    this.isPomodoroTime = false;
    this.isRestTime = true;
    this.SetToRestTime()
  }

  currentRestEnded() {
    if(this.pomodoros == 0) {
      this.stopTimer()
      console.log('acabou')
    } else {
      this.stopTimer()
      this.isPomodoroTime = true;
      this.isRestTime = false;
      this.SetToPomodoroTime()
    }
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
  }

}
