import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../tasks/Task";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.less']
})
export class TaskEditComponent implements OnInit {
  @Input() task: Task;

  constructor() { }

  ngOnInit(): void {
  }

}
