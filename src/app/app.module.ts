import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './pomodoro/header/header.component';
import { TimerComponent } from './pomodoro/timer/timer.component';
import { AddTaskComponent } from './pomodoro/add-task/add-task.component';
import { TaskListComponent } from './pomodoro/task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListItemComponent } from './pomodoro/task-list/task-list-item/task-list-item.component';
import { TaskService } from './pomodoro/task.service';

@NgModule({
  declarations: [
    AppComponent,
    PomodoroComponent,
    HeaderComponent,
    TimerComponent,
    AddTaskComponent,
    TaskListComponent,
    TaskListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
