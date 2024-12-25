import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../task.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, NgFor],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTask = '';
  filteredTasks: Task[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
    this.filterTasks(this.filter);
  }

  addTask() {
    if (this.newTask.trim()) {
      this.taskService.addTask(this.newTask.trim());
      this.newTask = '';
      this.loadTasks();
    } else {
      alert('Task can not be empty!');
    }
  }

  toggleTaskComplete(id: number) {
    this.taskService.toggleTaskComplete(id);
    this.loadTasks();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  editTask(task: Task) {
    const newTitle = prompt('Edit task title: ', task.title);
    if (newTitle) {
      this.taskService.editTask(task.id, newTitle.trim());
      this.loadTasks();
    }
  }

  filterTasks(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    if (filter === 'active') {
      this.filteredTasks = this.tasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      this.filteredTasks = this.tasks.filter((task) => task.completed);
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }
}
