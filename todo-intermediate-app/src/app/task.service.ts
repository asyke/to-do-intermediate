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
    const savedTasks = localStorage.getItem('tasks');
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string): void {
    this.tasks.push({
      id: Date.now(),
      title,
      completed: false,
    });
    this.saveTasks();
  }

  toggleTaskComplete(id: number): void {
    const task = this.tasks.find((t) => t.id === id);

    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  editTask(id: number, newTitle: string): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      this.saveTasks();
    }
  }

  deleteTask(id: number):void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTasks();
  }
}
