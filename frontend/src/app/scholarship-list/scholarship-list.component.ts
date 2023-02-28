import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-scholarship-list',
  templateUrl: './scholarship-list.component.html',
  styleUrls: ['./scholarship-list.component.less']
})
export class ScholarshipListComponent implements OnInit {
  public scholarships: any[];

  constructor() {
    this.scholarships = [
      {
        scholarshipId: 1,
        title: 'Scholarship 1',
        organization: 'Organization 1',
        description: 'Description 1',
        requirements: 'Requirements 1',
        amount: '100'
      },
      {
        scholarshipId: 2,
        title: 'Scholarship 2',
        organization: 'Organization 2',
        description: 'Description 2',
        requirements: 'Requirements 2',
        amount: '200'
      },
      {
        scholarshipId: 3,
        title: 'Scholarship 3',
        organization: 'Organization 3',
        description: 'Description 3',
        requirements: 'Requirements 3',
        amount: '300'
      },
    ];
  }

  ngOnInit(): void {
  }

  getUserType() {
    return "committeeMember"//sessionStorage.getItem("userType");
  }
}
