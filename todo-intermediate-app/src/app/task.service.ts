import { Injectable } from '@angular/core';
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks() {
    return this.tasks;
  }

  addTask(title: string): void {
    this.tasks.push({ id: Date.now(), title, completed: false });
    this.saveTasks();
  }

  toggleTaskComplete(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      console.log("object");
      this.saveTasks();
    }
  }

  editTask(id: number, newTitle: string): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.title = newTitle;
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }
}
