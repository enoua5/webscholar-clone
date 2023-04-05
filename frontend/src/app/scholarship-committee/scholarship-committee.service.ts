import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

/**
 * ScholarshipCommitteeService is a service that handles the retrieval of
 * scholarship applicant data for the scholarship committee component.
 * It provides methods for fetching applicant data either from hard-coded
 * data to test it or an API.
 */
export class ScholarshipCommitteeService {
    private apiUrl = '';

    /**
     * applicants is an array of hard-coded scholarship applicant data for testing.
     * This should be removed or commented out once the API is ready.
     */
    private applicants: any[] = [
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
        {
            name: "Jim Halpert",
            applicationId: 456789,
            schoolId: "W2161657",
            applicationScore: 4
        },
    ];

    /**
     * Constructs the ScholarshipCommitteeService instance and injects the HttpClient.
     * @param http - The HttpClient instance for making API calls.
     */
    constructor(private http: HttpClient) { }

    /**
     * Fetches the scholarship applicant data either from hard-coded data or an API.
     * @returns {Observable<any[]>} An Observable containing an array of scholarship applicant data.
     */
    getApplicants(): Observable<any[]> {
        // Uncomment the line below to use the API when it's ready
        // return this.http.get<any[]>(this.apiUrl);

        // Comment or delete the line below when you start using the API
        return of(this.applicants);
    }

    filterApplicants(allApplicants: any[], filter: number, searchString: string): any[] {
        let filteredApplicants = allApplicants;

        if (filter === 1) {
            filteredApplicants = filteredApplicants.filter((app) => app.applicationScore === null);
        }

        if (searchString.length !== 0) {
            // Implement your search logic here
        }

        return filteredApplicants;
    }

    /**
     * Fetches the scholarship information using the scholarship ID.
     * @param scholarshipId - The ID of the scholarship.
     * @returns {Observable<any>} An Observable containing the scholarship information.
     */
    getScholarshipInfo(scholarshipId: number): Observable<any> {
        // Uncomment the line below to use the API when it's ready
        // return this.http.get<any>(`${this.apiUrl}/scholarships/${scholarshipId}`);

        // Comment or delete the line below when you start using the API
        // For now, just return an object with a title as a sample
        return of({ title: 'Scholarship ' + scholarshipId });
    }
}
