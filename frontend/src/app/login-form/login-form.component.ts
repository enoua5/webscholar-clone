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

  //hash the password in md5
  private hashPassword(password: string): string {
    return btoa(password);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.form.value.password = this.hashPassword(this.form.value.password);
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
