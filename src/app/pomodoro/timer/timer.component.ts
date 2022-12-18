import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter, map, Subscription } from 'rxjs';
import { clearInterval, setInterval } from 'worker-timers';
import { Task } from '../task.moodel';
import { TaskService, timer } from '../task.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  currentTask: Task;
  @ViewChild('modal') modal: ElementRef;
  isTimerStarted: boolean = false;
  isTaskSelected: boolean = false;
  completePomodoCycle: boolean;
  isPomodoroTime: boolean;
  isRestTime: boolean;
  isTaskOver: boolean;

  alarm = new Audio();


  minutes: number;
  seconds: number = 0;
  pomodoros: number;

  timerSettings: timer;
  timerSettingsSub: Subscription;
  timer: any;
  taskSub: Subscription;

  constructor(private taskService: TaskService, private titleService: Title) { }

  ngOnInit(): void {
    this.alarm.src = "../../assets/sounds/Som de Despertador Efeitos Sonoros   Alarm Clock Sound - Sound Effect .mp3"
    this.taskSub = this.taskService.selectTask
      .subscribe(taskData => {
        this.currentTask = taskData;
        this.pomodoros = taskData.pomodoros;
        this.resetTimer()
        this.SetToPomodoroTime()
        this.isPomodoroTime = true;
        if(taskData.pomodoros == 4) this.completePomodoCycle = true;
        if(this.isTimerStarted) this.stopTimer()
        this.isTaskSelected = true;
        this.isTaskOver = false;
    })

    this.timerSettings = this.taskService.getTime();

    this.timerSettingsSub = this.taskService.timerChanged.subscribe(newTimerSettings => {
      this.timerSettings = newTimerSettings;
      this.resetTimer()
    })

  }

  startTimer() {
    this.stopAlarm()
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
    this.minutes = this.timerSettings.pomodoro;
    this.seconds = 0;
    this.stopTimer();
  }

  SetToPomodoroTime(){
    this.isRestTime = false;
    this.minutes = this.timerSettings.pomodoro;
    this.titleService
      .setTitle(`${this.minutes < 10 ? '0': ''}${this.minutes}:${this.seconds < 10 ? '0': ''}${this.seconds == 0 ? 0 : this.seconds - 1}`)
  }

  SetToRestTime() {
    this.isPomodoroTime = false
    if(this.pomodoros == 0 && this.completePomodoCycle) {
      this.minutes = this.timerSettings.longBreak
    } else {
      this.minutes = this.timerSettings.shortBreak
    }
    this.titleService
      .setTitle(`${this.minutes < 10 ? '0': ''}${this.minutes}:${this.seconds < 10 ? '0': ''}${this.seconds == 0 ? 0 : this.seconds - 1}`)
  }

  currentPomodoroEnded() {
    this.pomodoros--
    this.stopTimer()
    this.isRestTime = true;
    this.SetToRestTime()
    this.playAlarm()
  }

  currentRestEnded() {
    if(this.pomodoros == 0) {
      this.stopTimer()
      this.onTaskOver()
      this.SetToPomodoroTime()
    } else {
      this.stopTimer()
      this.isPomodoroTime = true;
      this.SetToPomodoroTime()
    }
    this.playAlarm()
  }

  onTaskOver() {
    this.isTaskOver = true;
    this.playAlarm()
  }

  finishTask(){
    this.titleService.setTitle('Pomodoro')
    this.stopAlarm()
    this.isTaskSelected = false;
    //atualizar dados da tarefa completa
    //arrumar um jeito de apagar a porra da tarefa
    this.resetTimer()
    this.isTaskOver = false;
    this.taskService.completeTask(this.currentTask.id);
  }

  closeModalByClickingOutside(event: any){
    if(this.modal.nativeElement !== event.srcElement) this.finishTask()
  }

  playAlarm(){
    this.alarm.load();
    this.alarm.play();
  }

  stopAlarm(){
    this.alarm.pause();
    this.alarm.currentTime = 0;
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
  }

}
