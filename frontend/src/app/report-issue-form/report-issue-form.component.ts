// ToDO: Limit page to only be viewable if the user is logged in.
// ToDO: Redirect back to list of issues once that page is set up.
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportIssueFormService} from "./report-issue-form.service";
import {IssueService} from "../issues/issue.service";

@Component({
  selector: 'app-report-issue-form',
  templateUrl: './report-issue-form.component.html',
  styleUrls: ['./report-issue-form.component.less']
})
export class ReportIssueFormComponent implements OnInit {
  // Reactive form
  reportIssueForm: FormGroup;
  severityList: string[];
  priorityList: string[];
  statusList: string[];
  errorMessage: string = "";
  validMessage: string = "";
  // ToDO: Add the logic to check if they're actually signed in.
  SignedIn: boolean = true;


  constructor(
    private reportIssueFormService: ReportIssueFormService,
    private issueService: IssueService,
    private formBuilder: FormBuilder) {
    this.reportIssueForm = this.formBuilder.group({
      username: ['', {validators: [Validators.required]}],
      summary: ['', {
        validators: [
          Validators.required,
          Validators.minLength(15)
        ]}],
      description: ['', {
        validators: [
          Validators.required,
          Validators.minLength(50)
        ]}],
      recreate: ['', {
        validators: [
          Validators.required,
          Validators.minLength(15)
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
    this.priorityList = this.issueService.priorityList;
    this.severityList = this.issueService.severityList;
    this.statusList = this.issueService.statusList;
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
      console.error(this.reportIssueForm);
      this.validMessage = "";
      this.errorMessage = "Please fill out the form before submitting!";
    }
  }
}
