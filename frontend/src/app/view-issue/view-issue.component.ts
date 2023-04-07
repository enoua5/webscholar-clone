import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iissue } from '../issues/issue';
import { IssueService } from '../issues/issue.service';
import { Iuser } from '../issues/user';
import { Icomment } from '../issues/comment';

@Component({
    selector: 'app-view-issue',
    templateUrl: './view-issue.component.html',
    styleUrls: ['./view-issue.component.less']
})
export class ViewIssueComponent implements OnInit {
    updateIssueForm: FormGroup;
    severityList: string[];
    priorityList: string[];
    statusList: string[];
    comments: Icomment[];
    errorMessage: string = '';
    issueInfo: Iissue | undefined;
    // ToDo: Have this actually check if they are signed in.
    SignedIn: boolean = true;
    userList: Iuser[];
    issueID: number;

    constructor(
        private issueService: IssueService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.updateIssueForm = this.formBuilder.group(
            {
                reporter: ['', { validators: [Validators.required] }],
                worker: ['', { validators: [] }],
                summary: [
                    '',
                    {
                        validators: [
                            Validators.required,
                            Validators.pattern('^.{15,}$')
                        ]
                    }
                ],
                description: [
                    '',
                    {
                        validators: [
                            Validators.required,
                            Validators.pattern('^.{50,}$')
                        ]
                    }
                ],
                stepsToRecreate: ['', { validators: [] }],
                severity: ['', { validators: [Validators.required] }],
                priority: ['', { validators: [Validators.required] }]
            },
            {
                updateOn: 'blur'
            }
        );
    }

    get reporter() {
        return this.updateIssueForm.get('reporter');
    }

    get summary() {
        return this.updateIssueForm.get('summary');
    }

    get description() {
        return this.updateIssueForm.get('description');
    }

    get stepsToRecreate() {
        return this.updateIssueForm.get('stepsToRecreate');
    }

    get severity() {
        return this.updateIssueForm.get('severity');
    }

    get priority() {
        return this.updateIssueForm.get('priority');
    }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.issueID = id;

        this.severityList = this.issueService.severityList;
        this.priorityList = this.issueService.priorityList;
        this.statusList = this.issueService.statusList;

        // ToDo: Add this once we have the Users API Working
        // this.getUsers();

        // ToDo: Add this once we have the Comments API Working
        // this.getComments(id);

        if (id) {
            this.getIssueInfo(id);
        }

        this.updateIssueForm.get('reporter').disable();

        if (!this.SignedIn) {
            this.updateIssueForm.get('summary').disable();
            this.updateIssueForm.get('description').disable();
            this.updateIssueForm.get('stepsToRecreate').disable();
            this.updateIssueForm.get('severity').disable();
            this.updateIssueForm.get('priority').disable();
        }
    }

    getIssueInfo(id: number): void {
        this.issueService.getIssue(id).subscribe({
            next: (issue) => (this.issueInfo = issue),
            error: (err) => (this.errorMessage = err)
        });
    }

    /**
     * Gets a list of active Users
     * @returns {Iuser[]}
     */
    getUsers(): void {
        this.issueService.getActiveUsers().subscribe({
            next: (userList) => (this.userList = userList),
            error: (err) => (this.errorMessage = err)
        });
    }

    /**
     * Gets a list of Comments for the Issue
     * @param {number} id
     * @returns {Icomment[]}
     */
    getComments(id: number): void {
        this.issueService.getIssueComments(id).subscribe({
            next: (comments) => (this.comments = comments),
            error: (err) => (this.errorMessage = err)
        });
    }

    onBack(): void {
        this.router.navigate(['/issues']);
    }

    /**
     * Updates the information for an issue.
     * @constructor
     */
    UpdateIssue() {
        //  Todo: Use the issue service to update the issue.
    }

    SubmitUpdate() {}
}
