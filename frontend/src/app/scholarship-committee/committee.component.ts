import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.less']
})
export class CommitteeComponent implements OnInit {
  public applicants: any[];
  public scholarship: any[];

  constructor() {
    this.applicants = [
      {
        name: "John Smith",
        applicationId: 123456,
        schoolId: "W0123456",
        applicationScore: null,
      },
      {
        name: "Jane Smith",
        applicationId: 234567,
        schoolId: "W1234567",
        applicationScore: 3
      },
      {
        name: "Jack Black",
        applicationId: 345678,
        schoolId: "W2345678",
        applicationScore: 5
      },
    ];

    this.scholarship = [
      {
        scholarshipId: 1,
        title: 'Scholarship 1',
        organization: 'Organization 1',
        description: 'Description 1',
        requirements: 'Requirements 1',
        amount: '100'
      },
    ];
  }

  ngOnInit(): void {
  }

}
