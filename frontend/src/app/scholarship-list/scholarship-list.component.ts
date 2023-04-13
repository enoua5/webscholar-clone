import { Component, OnInit } from '@angular/core';
import { ScholarshipService } from './scholarship.service'; // Import the ScholarshipService


/**
 * ScholarshipListComponent is a component that displays a list of scholarships.
 * It fetches the scholarship data from the ScholarshipService.
 */
@Component({
    selector: 'app-scholarship-list',
    templateUrl: './scholarship-list.component.html',
    styleUrls: ['./scholarship-list.component.less']
})
export class ScholarshipListComponent implements OnInit {
    public scholarships: any[];


  constructor(private scholarshipService: ScholarshipService) { }

  /**
   * Lifecycle hook called when the component initializes. Fetches the scholarship
   * data by calling the getScholarships() method.
   */
  ngOnInit(): void {
    this.getScholarships(); // Fetch the scholarships data when the component initializes
  }

  /**
   * Fetches the scholarship data from the ScholarshipService and assigns them
   * to the scholarships array.
   */
  getScholarships(): void {
    this.scholarshipService.getScholarships().subscribe(scholarships => {
      this.scholarships = scholarships;
    });
  }

  /**
   * Retrieves the user type from the ScholarshipService.
   * @returns {string} The user type.
   */
  getUserType() {
    return this.scholarshipService.getUserType();
  }

}
