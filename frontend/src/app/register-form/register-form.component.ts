import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from "./register.service";


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RegisterService) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
      confirm_password: [''],
      school_email: [''],
      school_id: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.service.insert(this.form.value)
      .subscribe(this.processResponse);
  }
  private processResponse (data){
    console.log(data);
    if (data.success === true) {
      this.router.navigate(['/login']);
    } else {
      //this.error = data.error;
      console.log(data);
    }

  }

}
