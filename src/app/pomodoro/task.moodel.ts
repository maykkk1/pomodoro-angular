export class Task {
    id: number;
    name: string;
    pomodoros: number;

    constructor(id: number, name: string, pomodoros: number) {
        this.id = id;
        this.name = name;
        this.pomodoros = pomodoros;
    }
}