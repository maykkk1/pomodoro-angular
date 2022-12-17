export class Task {
    id: number;
    name: string;
    pomodoros: number;
    isActive: boolean

    constructor(id: number, name: string, pomodoros: number) {
        this.id = id;
        this.name = name;
        this.pomodoros = pomodoros;
        this.isActive = false;
    }
}