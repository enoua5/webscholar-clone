import { Component, OnInit } from '@angular/core';
import {Task} from "./Task";
import {tasks} from "./tasks.mock";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less']
})
export class TasksComponent implements OnInit {
  title:string = 'task list';

  tasks: Task[] = tasks;
  currentTask: Task = null;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(task: Task) {
    this.currentTask = task;
  }
}
