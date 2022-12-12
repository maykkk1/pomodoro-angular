import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "./task.moodel";

@Injectable({providedIn: 'root'})
export class TaskService {
    selectTask: Subject<Task> = new Subject();
    tasksChanged: Subject<Task[]> = new Subject();
    editedTask: Subject<Task> = new Subject();
    tasks: Task[] = [{id: 1, name: 'teste', pomodoros:1}];
    currentIdCounter: number = 0;

    getTasks() {
        return this.tasks.slice()
    }

    onSelectTask(task: Task){
        this.selectTask.next(task)
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