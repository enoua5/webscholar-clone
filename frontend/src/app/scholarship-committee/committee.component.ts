import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.less']
})
export class CommitteeComponent implements OnInit {
  public applicants: any[];
  public scholarshipTitle: any;

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
  }

  ngOnInit(): void {
    this.scholarshipTitle = "Scholarship 1";

    // first use the passed scholarshipId to get the scholarship information from the db.
    // next use the scholarshipID as a means of pulling a list of all applications for the scholarship
    // along with this take the user ID associated with each application to create a list of the applicants information
    // since every application has an applicant this will allow us to have 2 lists of the same length
    // this will then allow us to display certain information associated with the user as well as their application
    // this may require modifying how it iterates through the lists to be a single for loop based on the count of applicants

    // this wil also requre doing something similar for the getting the current score of the applicant.
    // another option could be creating a function that is called each iteration that will set the values
    //   for the user info and score, although I am not sure which would be more intensive at time of running the page
    //   at this time, will require testing to see which method will provide the best results for user.
  }
}
