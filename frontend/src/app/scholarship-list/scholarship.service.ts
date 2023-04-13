import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

/**
 * ScholarshipService is a service that handles the retrieval of scholarship
 * data and user types. It provides methods for fetching scholarship data
 * either from hard-coded data to test it or an API.
 */
export class ScholarshipService {
    private apiUrl = '';


    /**
     * scholarships is an array of hard-coded scholarship data for testing.
     * This should be removed or commented out once the API is ready.
     */
    private scholarships: any[] = [
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
            amount: '2200'
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

    /**
     * Constructs the ScholarshipService instance and injects the HttpClient.
     * @param http - The HttpClient instance for making API calls.
     */
    constructor(private http: HttpClient) { }

    /**
    * Fetches scholarship data either from hard-coded data or an API.
    *
    * @returns {Observable<any[]>} An Observable containing an array of scholarship data.
    * @example
    * const scholarships = this.scholarshipService.getScholarships().subscribe(data => {
    *   console.log(data);
    * });
    */
    getScholarships(): Observable<any[]> {
        // Uncomment the line below to use the API when it's ready
        // return this.http.get<any[]>(this.apiUrl);

        // Comment or delete the line below when you start using the API
        return of(this.scholarships);
    }

    /**
     * getUserType retrieves the user type from the session storage or an API.
     * This method should be updated with the correct logic for getting the user type
     * based on the application's requirements.
     * @returns A string representing the user type.
     */
    getUserType(): string {
        // TODO Implement logic for retrieving user type from storage or API
        return sessionStorage.getItem("committeeMember");
    }
}
