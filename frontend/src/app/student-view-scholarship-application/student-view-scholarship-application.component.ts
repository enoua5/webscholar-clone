import { Component } from '@angular/core';

@Component({
    selector: 'app-student-view-scholarship-application.component',
    templateUrl: './student-view-scholarship-application.component.html',
    styleUrls: ['./student-view-scholarship-application.component.less']
})
export class StudentViewScholarshipApplicationComponent {
    public name: string; // The name of the scholarship
    public organization: string; // The organization that sponsors the scholarship
    public description: string; // The description of the scholarship
    public amount: number; // The amount of money the scholarship is worth
    public requirements: string; // The requirements to be considered

    constructor() {
        // Just give some dummy data for now. Later we'll get it from the database.
        this.name = 'Richard Daystrom Memorial Scholarship';
        this.organization = 'Daystrom Institute';
        this.description =
            'A scholarship given in honor of the late, great Dr. Richard Daystrom.';
        this.requirements =
            'Recipients must be majoring in warp field computation.';
        this.amount = 3000.0;
    }
}
