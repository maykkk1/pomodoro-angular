import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "./task.moodel";

export interface timer {
    shortBreak: number,
    longBreak: number,
    pomodoro: number
}

@Injectable({providedIn: 'root'})
export class TaskService {
    selectTask: Subject<Task> = new Subject();
    tasksChanged: Subject<Task[]> = new Subject();
    editedTask: Subject<Task> = new Subject();
    timerChanged: Subject<timer> = new Subject();
    tasks: Task[] = [];
    currentIdCounter: number = 0;
    time: timer = {shortBreak:5, longBreak:15, pomodoro: 50}
    currentActiveTask: Task;


    getTasks() {
        return this.tasks.slice()
    }

    getTime(){
        return this.time;
    }

    onSelectTask(task: Task){
        const newActiveTask = this.tasks.find(t => t.id == task.id)
        if(this.currentActiveTask != undefined && newActiveTask != undefined) {
            this.currentActiveTask.isActive = false;
            this.currentActiveTask = newActiveTask;
            this.currentActiveTask.isActive = true;
            return this.selectTask.next(task)
        } else if(newActiveTask != undefined) {
            this.currentActiveTask = newActiveTask;
            this.currentActiveTask.isActive = true;
            return this.selectTask.next(task)
        }
    }

    deleteTask(taskId: number){
        this.tasks = this.tasks.filter(t => t.id != taskId)
        this.tasksChanged.next(this.tasks.slice())
    }

    addTask(task: {name: string, pomodoros: number}) {
        const newTask = new Task(this.currentIdCounter, task.name, task.pomodoros);
        this.tasks.push(newTask);
        this.currentIdCounter++
        this.tasksChanged.next(this.tasks.slice())
    }

    onEditedTask(id: number, task: {name: string, pomodoros: number}){
        const editedTask = this.tasks.find(t => t.id === id)
        if(editedTask != undefined) {
            editedTask.name = task.name
            editedTask.pomodoros = task.pomodoros
            this.tasksChanged.next(this.tasks.slice())
        }
    }
}