import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    alert('button pressed');
  }
}
