import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "./login.service";
import {emailExistsValidator} from "./validators";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: LoginService
  ) {
    this.form = this.fb.group({
      username: ['', {
        validators: [
          Validators.required,
          Validators.email
        ],
        asyncValidators: [
          emailExistsValidator(service)
        ]
      }],
      password: ['', {
        validators: [
          Validators.required
        ],
        updateOn: 'change'
      }]
    }, {
      updateOn: 'blur'
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

    const jsonObj = JSON.stringify({
      email: this.username.value,
      password: this.password.value
    });

    this.service.login(jsonObj).subscribe(
      res => {
        // Put whatever needs to be executed *after* the routing is done in the .then()
        this.router.navigate(['/dashboard']).then(res => true);
      },
      err => {
        console.log(err);
        // TODO: display error message in a better way (I.e., set an error variable & display with HTML)
        alert(err.error.message);
      }
    );
  }
}
