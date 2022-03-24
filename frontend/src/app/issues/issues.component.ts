// ToDo: Verify that the user is logged in. If not, redirect to Login Page

import {Component, OnInit} from '@angular/core';
import {Iissue} from "./issue";
import {IssueService} from "./issue.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.less']
})
export class IssuesComponent implements OnInit {
  pageTitle = 'Issue List';
  sub!: Subscription;
  issues: Iissue[] = [];
  filteredIssues: Iissue[] = [];
  private errorMessage: any;

  constructor(private issueService: IssueService) {
  }

  private _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredIssues = this.performFilter(value);
  }

  /**
   * Filters the list of issues based on their summary field.
   * @param filterBy - String to filter summary based on.
   */
  performFilter(filterBy: string): Iissue[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.issues.filter((issue: Iissue) =>
      issue.issueSummary.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.issues = [{
      issueID: 123,
      issueStatus: "Open",
      issueSummary: "This is just a test",
      issueDescription: "This is a longer version of the test",
      issueSeverity: "Medium",
      issuePriority: "Medium",
      issueReporter: "AnthonyBahl",
      issueWorker: "AnthonyBahl"
    },
      {
        issueID: 321,
        issueStatus: "Open",
        issueSummary: "Fake Issue",
        issueDescription: "This is just a fake issue.",
        issueSeverity: "Low",
        issuePriority: "Low",
        issueReporter: "AnthonyBahl",
        issueWorker: ""
      },
      {
        issueID: 123456,
        issueStatus: "Open",
        issueSummary: "Docker Won't Start",
        issueDescription: "I can't get Docker to work properly... Here are the things I've tried.",
        issueSeverity: "Critical",
        issuePriority: "High",
        issueReporter: "AnthonyBahl",
        issueWorker: ""
      }];
    this.filteredIssues = this.issues;

    // ToDo: Use this code instead once we have API working
    /*this.sub = this.issueService.getOpenIssues().subscribe({
      next: issues => {
        this.issues = issues;
        this.filteredIssues = this.issues;
      },
      error: err => this.errorMessage = err
    });*/
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
