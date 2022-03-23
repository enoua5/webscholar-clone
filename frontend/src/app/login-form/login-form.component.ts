import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  error: string = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: LoginService
  ) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.service.login(this.form.value)
      .subscribe((data) => this.processResponse(data));

  }

  private processResponse(data) {
    console.log(data);
    if (data.success === true) {
      // this.router.navigate(['/']);
      alert("login in");
    } else {
      this.error = data.error;
    }

  }
}
