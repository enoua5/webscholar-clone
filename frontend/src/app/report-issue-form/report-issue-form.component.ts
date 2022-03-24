// ToDO: Limit page to only be viewable if the user is logged in.
// ToDO: Redirect back to list of issues once that page is set up.
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReportIssueFormService} from "./report-issue-form.service";
import {emailTakenValidator, passwordMatchValidator} from "../register-form/validators";

@Component({
  selector: 'app-report-issue-form',
  templateUrl: './report-issue-form.component.html',
  styleUrls: ['./report-issue-form.component.less']
})
export class ReportIssueFormComponent implements OnInit {
  // Reactive form
  reportIssueForm: FormGroup;
  severityList: string[] = [
    'Critical',
    'Major',
    'Moderate',
    'Minor',
    'Cosmetic'
  ];
  priorityList: string[] = [
    'Low',
    'Medium',
    'High'
  ]
  errorMessage: string = "";
  validMessage: string = "";
  SignedIn: boolean = true;


  constructor(
    private reportIssueFormService: ReportIssueFormService,
    private formBuilder: FormBuilder) {
    this.reportIssueForm = this.formBuilder.group({
      username: ['', {validators: [Validators.required]}],
      summary: ['', {
        validators: [
          Validators.required,
          Validators.pattern('^.{15,}$')
        ]}],
      description: ['', {
        validators: [
          Validators.required,
          Validators.pattern('^.{50,}$')
        ]}],
      recreate: ['', {
        validators: [
          Validators.required,
          Validators.pattern('^.{15,}$')
        ]}],
      severity: ['', {validators: [Validators.required]}],
      priority: ['', {validators: [Validators.required]}],
    }, {
      updateOn: 'blur'
    });
  }

  get username() {
    return this.reportIssueForm.get('username');
  }

  get summary() {
    return this.reportIssueForm.get('summary');
  }

  get description() {
    return this.reportIssueForm.get('description');
  }

  get recreate() {
    return this.reportIssueForm.get('recreate');
  }

  get severity() {
    return this.reportIssueForm.get('severity');
  }

  get priority() {
    return this.reportIssueForm.get('priority');
  }

  ngOnInit(): void {
  }

  SubmitIssue() {
    if (this.reportIssueForm.valid) {
      this.errorMessage = "";
      this.validMessage = "";
      this.reportIssueFormService.createIssue(this.reportIssueForm.value).subscribe(
        data => {
          this.reportIssueForm.reset();
          this.validMessage = "Your issue has been reported. Thank you!";
          return true;
        },
        error => {
          this.errorMessage = error;
        }
      )
    } else {
      this.validMessage = "";
      this.errorMessage = "Please fill out the form before submitting!";
    }
  }
}
