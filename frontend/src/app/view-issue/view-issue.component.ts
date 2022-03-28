import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Iissue} from "../issues/issue";
import {IssueService} from "../issues/issue.service";

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.less']
})
export class ViewIssueComponent implements OnInit {
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
  issueInfo: Iissue;

  constructor(private issueService: IssueService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getIssueInfo(this.route.snapshot.params['id']);
  }

  getIssueInfo(id: number) {
    this.issueService.getIssue(id).subscribe(
      data => this.issueInfo = data,
      err => console.error(err),
      () => console.log('issue loaded')
    );
  }

  /**
   * Updates the information for an issue.
   * @constructor
   */
  UpdateIssue() {
    //  Todo: Use the issue service to update the issue.
  }
}
