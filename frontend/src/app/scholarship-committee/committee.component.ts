import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forEach } from 'cypress/types/lodash';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.less']
})
export class CommitteeComponent implements OnInit {
  public allApplicants: any[];
  public displayedApplicants: any[];
  public scholarshipTitle: any;
  public scholarId: any;
  public searchString: string;
  public currentFilter: any;

  constructor(private _Activedroute:ActivatedRoute) {    
    this.allApplicants = [
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
    this.scholarId = this._Activedroute.snapshot.paramMap.get("id");
    this.scholarId = this.scholarId as number;
    this.scholarshipTitle = "Scholarship " + this.scholarId;
    this.displayedApplicants = Object.assign([], this.allApplicants);
    this.currentFilter = 0;
    this.searchString = "";

    // first use the passed scholarshipId to get the scholarship information from the db.
    // next use the scholarshipID as a means of pulling a list of all applications for the scholarship
    // along with this take the user ID associated with each application to create a list of the applicants information
    // since every application has an applicant this will allow us to have 2 lists of the same length
    // this will then allow us to display certain information associated with the user as well as their application
    // this may require modifying how it iterates through the lists to be a single for loop based on the count of applicants

    // this wil also requre doing something similar for the getting the current score of the applicant.
    // Another option could be creating a function that is called each iteration that will set the values
    //   for the user info and score, although I am not sure which would be more intensive at time of running the page
    //   at this time, will require testing to see which method will provide the best results for user.
  }

  filterApps(filter): void {
    if (filter == 0) {
      this.displayedApplicants.splice(0);
      this.displayedApplicants = Object.assign([], this.allApplicants);
      this.currentFilter = 0;
    }
    else if (filter == 1) {
      this.displayedApplicants = this.displayedApplicants.filter((app) => app.applicationScore === null)
      this.currentFilter = 1;
    }
    if (this.searchString.length != 0) 
      console.log(this.searchString);

    /* This function will be used to filter the list of applicants down for better scoring and visability for committee members.
     * The first major part of this is the ability to filter based on all applications or only those that are unscored.
     *   This would be done via API call. There would be 2 different calls used, or one call but with differing passed values.
     *   The call would return a list of all applicable applicants and that will be assigned to the displayedApplicants array to
     *   be displayed to the user.
     *
     * The second part of this will be the ability for the user to filter by the name, school id, or app id. The way this will work
     *   is similar to the filtering above, mostly because it will likely be implementeed as an additional value passed to the backend
     *   in the API call. This would likely be the easiest method of doing so. The only issue that might arrise from this would be due
     *   to the current way that entering text into the field calls the filterApps function. It is currently called on key, meaning
     *   any time a single character or button is pressed on the key board. If this turns out to be to much, and subsequently causes
     *   slowdown for the page it could easily be adjusted to be called when a button is clicked by the user. This would cut back
     *   on API calls, however would mean another button press for users and would not allow for the added visibility given by updating
     *   the visible list of applicants by each seperate letter entered. Although, whether that would be a concern is unknown at this time.
     * */
  }
}
