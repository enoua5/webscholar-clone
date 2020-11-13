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
  error: string = null;
  errors: Map<string, string> = new Map();


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

  private checkErrors(): void{
    this.errors.clear();
    if(this.form.get('password').value != this.form.get('confirm_password').value){
      this.errors.set('confirm_password', 'Password does not match');
    }
    const regex = RegExp('^W[0-9]{8}$');
    if(!regex.test(this.form.get('school_id').value)){
      this.errors.set('school_id', 'Invalid format');
    }
   //todo check if check mark is set
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.checkErrors();
    if(this.errors.size == 0){
      this.service.insert(this.form.value)
        .subscribe((data) => this.processResponse(data));
    }
  }

  private processResponse(data) {
    console.log(data);
    if (data.success === true) {
      this.router.navigate(['/']);
    } else {
      this.error = data.error;
      this.errors = new Map(Object.entries(data.errors));
    }

  }

}
