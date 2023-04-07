// ToDo: Verify that the user is logged in. If not, redirect to Login Page

import { Component, OnInit } from '@angular/core';
import { Iissue } from './issue';
import { IssueService } from './issue.service';
import { Subscription } from 'rxjs';

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
    errorMessage: string = '';
    // ToDo: Add logic to check if the user is signed in.
    SignedIn: boolean = true;

    constructor(private issueService: IssueService) {}

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
     * @returns {Iissue[]} - Filtered list of issues.
     */
    performFilter(filterBy: string): Iissue[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.issues.filter((issue: Iissue) =>
            issue.issueSummary.toLocaleLowerCase().includes(filterBy)
        );
    }

    ngOnInit(): void {
        this.sub = this.issueService.getOpenIssues().subscribe({
            next: (issues) => {
                this.issues = issues;
                this.filteredIssues = this.issues;
            },
            error: (err) => (this.errorMessage = err)
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
