// ToDO: Limit page to only be viewable if the user is logged in.
// ToDO: Redirect back to list of issues once that page is set up.
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReportIssueFormService} from "./report-issue-form.service";

@Component({
  selector: 'app-report-issue-form',
  templateUrl: './report-issue-form.component.html',
  styleUrls: ['./report-issue-form.component.less']
})
export class ReportIssueFormComponent implements OnInit {
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


  constructor(private reportIssueFormService: ReportIssueFormService) {
  }

  ngOnInit(): void {
    this.reportIssueForm = new FormGroup({
      reporter: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      severity: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required)
    })
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
