import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScholarshipCommitteeService } from './scholarship-committee.service';
import { forEach } from 'cypress/types/lodash';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.less']
})

/**
 * The CommitteeComponent is responsible for displaying and filtering scholarship applicants for the
 * scholarship committee members. It fetches the scholarship data and the list of applicants from the
 * ScholarshipCommitteeService, and allows the user to filter the applicants based on their application
 * status (scored/unscored) and search criteria (name, school id, or app id).
 */
export class CommitteeComponent implements OnInit {
  public allApplicants: any[];
  public displayedApplicants: any[];
  public scholarshipTitle: any;
  public scholarId: any;
  public searchString: string;
  public currentFilter: any;

  constructor(private _Activedroute: ActivatedRoute, private scholarshipCommitteeService: ScholarshipCommitteeService) { }


  /**
  * ngOnInit lifecycle hook.
  * First, use the passed scholarshipId to get the scholarship information from the db.
  * Next, use the scholarshipID as a means of pulling a list of all applications for the scholarship.
  * Along with this, take the user ID associated with each application to create a list of the applicants' information.
  * Since every application has an applicant, this will allow us to have 2 lists of the same length.
  * This will then allow us to display certain information associated with the user as well as their application.
  * This may require modifying how it iterates through the lists to be a single for loop based on the count of applicants.
  * This will also require doing something similar for getting the current score of the applicant.
  * Another option could be creating a function that is called each iteration that will set the values
  * for the user info and score, although it's uncertain which would be more intensive at the time of running the page.
  * At this time, testing will be required to see which method will provide the best results for the user.
  */
  ngOnInit(): void {
    this.scholarId = this._Activedroute.snapshot.paramMap.get("id");
    this.scholarId = this.scholarId as number;
    this.scholarshipTitle = "Scholarship " + this.scholarId;

    this.scholarshipCommitteeService.getApplicants().subscribe((applicants) => {
      this.allApplicants = applicants;
      this.displayedApplicants = Object.assign([], this.allApplicants);
    });

    this.currentFilter = 0;
    this.searchString = "";
  }


  /**
  * This function is used to filter the list of applicants down for better scoring and visibility for committee members.
  * The first major part of this is the ability to filter based on all applications or only those that are unscored.
  * This would be done via API call. There would be 2 different calls used, or one call but with differing passed values.
  * The call would return a list of all applicable applicants and that will be assigned to the displayedApplicants array
  * to be displayed to the user.
  *
  * The second part of this will be the ability for the user to filter by the name, school id, or app id. The way this
  * will work is similar to the filtering above, mostly because it will likely be implemented as an additional value
  * passed to the backend in the API call. This would likely be the easiest method of doing so. The only issue that
  * might arise from this would be due to the current way that entering text into the field calls the filterApps function.
  * It is currently called on key, meaning any time a single character or button is pressed on the keyboard. If this
  * turns out to be too much, and subsequently causes slowdown for the page, it could easily be adjusted to be called
  * when a button is clicked by the user. This would cut back on API calls, however, would mean another button press
  * for users and would not allow for the added visibility given by updating the visible list of applicants by each
  * separate letter entered. Although, whether that would be a concern is unknown at this time.
   *
   * Filtering by name, schoolId, and applicationId is accomplished rather simply. An if statement checks if the
   * search string is longer than 0 characters. If so, the search string is cast to all lower case. Simple
   * if-statements will then check if the search string entirely consists of integers and has a length of 6. If so,
   * we assume the user is entering an applicationId. If not, then an else-if statement will check if the search string
   * begins with the letter 'w' and if the search string has a length of 8. If so, we assume the user is entering a
   * schoolId. If not, we assume that the user is simply entering a name. After we determine what the user is searching
   * for, API calls are made in order to display any matching scholarship applicants.
  *
  * @param filter The filter value to determine the display of applicants.
  */
  filterApps(filter): void {
    if (filter === 0) {
      this.displayedApplicants = Object.assign([], this.allApplicants);
      this.currentFilter = 0;
    } else if (filter === 1) {
      this.displayedApplicants = this.scholarshipCommitteeService.filterApplicants(this.allApplicants, filter, this.searchString);
      this.currentFilter = 1;
    }
    if (this.searchString.length !== 0) {
      console.log(this.searchString);
      const searchStr = this.searchString.toLowerCase();
      this.displayedApplicants = this.displayedApplicants.slice().filter(applicant => {
        if (searchStr.length === 6 && !isNaN(parseInt(searchStr))) {
          return String(applicant.applicationId).includes(searchStr);
        }
        else if (searchStr.charAt(0) === 'w' && searchStr.length === 8) {
          return applicant.schoolId.toLowerCase().includes(searchStr);
        }
        else {
          return applicant.name.toLowerCase().includes(searchStr);
        }
      });
    }
  }




}
