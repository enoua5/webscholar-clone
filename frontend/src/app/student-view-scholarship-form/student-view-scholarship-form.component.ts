import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-student-view-scholarship-form.component',
    templateUrl: './student-view-scholarship-form.component.html',
    styleUrls: ['./student-view-scholarship-form.component.less']
})
export class StudentViewScholarshipFormComponent implements OnInit {
    public students: any[];

    constructor() {
        this.students = [
            {
                studentName: 'John Smith',
                address: '1515 MockingBird Lane',
                city: 'Salt Lake City',
                state: 'Utah',
                zip: 84135,
                phone: '555-867-5309',
                email: 'myemail@email.weber.edu',
                dob: '5/26/1997',
                gender: 'Male',
                wNumber: 'W2356432',
                currentMajor: 'Computer Science',
                currentAcademicLevel: 'Junior',
                gpa: 3.6,
                majorGpa: 3.5,
                actscore: 24.3,
                satscore: 1150,
                firstSemester: 'Spring',
                firstYear: 2018,
                ultimatedegreeGoal: 'I have one',
                pastCScourses: 'CS 1010, CS 2420, CS 2810',
                pastFinancialAid: 'Yes',
                greatestAchievements: 'Yes',
                honorsAndawards: 'Yes',
                csinterests: 'Yes',
                currentstatus: 'In Progress'
            }
        ];
    }

    ngOnInit(): void {}
}
