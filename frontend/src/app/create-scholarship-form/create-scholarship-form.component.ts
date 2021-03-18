import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ScholarshipService} from "../create-scholarship-form/scholarship.service";

@Component({
  selector: 'app-create-scholarship-form',
  templateUrl: './create-scholarship-form.component.html',
  styleUrls: ['./create-scholarship-form.component.less']
})
export class CreateScholarshipFormComponent implements OnInit {
  form: FormGroup;
  error: string = null;
  errors: Map<string, string> = new Map();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private service: ScholarshipService) {
    this.form = this.fb.group({
      full_name: [''],
      your_email: [''],
      scholarship_name: [''],
      scholarship_provider: [''],
      scholarship_amount: [''],
      scholarship_info: [''],
      eligible_students: [''],
      donation_checkbox: [''],
      terms_checkbox: ['']
    });
  }

  ngOnInit(): void {
  }

 private checkErrors(): void {
    this.errors.clear();

    //Check name
    if (this.form.get('full_name').value.length == 0) {
      this.errors.set('full_name', 'Name cannot be empty');
    }

    //Check email
    const validEmail = RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    if (this.form.get('your_email').value.length == 0 || !validEmail.test(this.form.get('your_email').value)) {
      this.errors.set('your_email', 'Invalid email');
    }

    //Check scholarship name
    if (this.form.get('scholarship_name').value.length == 0) {
      this.errors.set('scholarship_name', 'Name cannot be empty');
    }

    //Check scholarship provider
    if (this.form.get('scholarship_provider').value.length == 0) {
      this.errors.set('scholarship_provider', 'Provider cannot be empty');
    }

    //Check scholarship amount
    if (this.form.get('scholarship_amount').value.length == 0 || this.form.get('scholarship_amount').value <= 0) {
      this.errors.set('scholarship_amount', 'Amount cannot be empty or negative')
    }

    //Check scholarship info
    if (this.form.get('scholarship_info').value.length == 0) {
      this.errors.set('scholarship_info', 'Cannot have empty description');
    }

    //Check eligible students
    if (this.form.get('eligible_students').value.length == 0) {
      this.errors.set('eligible_students', 'Cannot be empty');
    }

    //Check terms checkbox
    if (this.form.get('terms_checkbox').value != true) {
      this.errors.set('terms_checkbox', 'Please indicate you have read and agree to the Terms and Conditions Policy');
    }

  }

  onSubmit(): void {
    console.log(this.form.value);
    this.checkErrors();
    if (this.errors.size == 0) {
      this.service.insert(this.form.value).subscribe((data) => this.processResponse(data));
    }
  }

  private processResponse(data) {
    console.log(data);
    if (data.success == true) {
      //Save the scholarship
      this.router.navigate(['../dashboard']);
      //this.errors.clear();
    }
    else {
      console.warn('Else Statement executed');
      this.error = data.error;
      this.errors = new Map(Object.entries(data.errors));
    }
  }

}
