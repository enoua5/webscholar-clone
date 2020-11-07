import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form-faculty',
  templateUrl: './register-form-faculty.component.html',
  styleUrls: ['./register-form-faculty.component.less']
})
export class RegisterFormFacultyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onRegister(): void {
    alert('button pressed');
  }

}
