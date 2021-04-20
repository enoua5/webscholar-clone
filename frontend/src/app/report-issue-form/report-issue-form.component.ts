import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterService} from "../register-form/register.service";

@Component({
  selector: 'app-report-issue-form',
  templateUrl: './report-issue-form.component.html',
  styleUrls: ['./report-issue-form.component.less']
})
export class ReportIssueFormComponent implements OnInit {
  form: FormGroup;
  error: string = null;
  errors: Map<string, string> = new Map();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RegisterService) {
    this.form = this.fb.group({
      issueName: [''],
      email: [''],
      issueType: [''],
      issueDescription: ['']
    });
  }

  ngOnInit(): void {
  }

  private checkErrors(): void {
    this.errors.clear();

    //Issue Name verification
    if (this.form.get('issueName').value.length == 0) {
      this.errors.set('issueName', 'Invalid Issue Name');
    }

    //Email verification
    const validEmail = RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    if (!validEmail.test(this.form.get('email').value) || this.form.get('email').value.length == 0) {
      this.errors.set('email', 'Invalid email format');
    }

    //Issue Type Verification
    if(this.form.get('issueType').value == ""){
      this.errors.set ('issueType', 'You Must Select an Issue Type')
    }

    //issue Description Verification
    if (this.form.get('issueDescription').value.length == 0) {
      this.errors.set('issueDescription', 'You Must Describe the Issue');
    }

  }

  onSubmit(): void {

    console.log(this.form.value);
    this.checkErrors();

    const issueName = this.form.get('issueName').value;
    const email = this.form.get('email').value;
    const issueType = this.form.get('issueType').value;
    const issueDescription = this.form.get('issueDescription').value;


    if(this.errors.size == 0){
      // this.service.insert(this.form.value)
      //   .subscribe((data) => this.processResponse(data));
      const jsonObj = JSON.stringify({
        issueName: issueName,
        issueType: issueType,
        email: email,
        issueDescription: issueDescription

      });

      console.log(jsonObj);
      //this.service.testAccountCreation().subscribe((data) => this.processResponse(data));

    }

  }

  private processResponse(data) {
    console.log(data);
    if (data.success == true) {
      this.router.navigate(['/dashboard']);
    }
    else {
      console.warn('Else Statement executed');
      this.error = data.error;
      this.errors = new Map(Object.entries(data.errors));
    }
  }

}
