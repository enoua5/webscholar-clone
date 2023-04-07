import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Iissue } from './issue';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Iuser } from './user';
import { Icomment } from './comment';

@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private issueBaseUrl = 'http://localhost:6005/issue';
    // ToDO: Delete assets/fakeIssues.json once we have a working API Key
    private issueUrl = this.issueBaseUrl + '/get_all_issues';
    // ToDo: Replace with working API Key
    private getUsersAPI = 'http://localhost:6001/account/get_all_accounts';
    // ToDo: Replace with working API Key
    private getCommentsAPI = '/account/getComments';
    private _severityList: string[] = [
        'Critical',
        'Major',
        'Moderate',
        'Minor',
        'Cosmetic'
    ];
    private _priorityList: string[] = ['Low', 'Medium', 'High'];
    private _statusList: string[] = [
        'Open',
        'In Progress',
        'Blocked',
        'In Review',
        'Done',
        'Obsolete'
    ];

    get severityList(): string[] {
        return this._severityList;
    }
    get priorityList(): string[] {
        return this._priorityList;
    }
    get statusList(): string[] {
        return this._statusList;
    }

    constructor(private http: HttpClient) {}

    /**
     * Gets a list of all issues in the database.
     * @return {Observable<Iissue[]>}
     */
    getIssues(): Observable<Iissue[]> {
        return this.http.get<Iissue[]>(this.issueUrl).pipe(
            tap((data) => console.log('All: ', JSON.stringify(data))),
            catchError(IssueService.handleError)
        );
    }

    /**
     * Gets a specific issue.
     * @param id - ID of issue to return.
     * @return {Observable<Iissue>}
     */
    getIssue(id: number): Observable<Iissue> {
        return this.getIssues().pipe(
            map((issues: Iissue[]) => issues.find((i) => i.issueID === id))
        );
    }

    /**
     * Gets a list of all open issues in the database.
     * @return {Observable<Iissue[]>}
     */
    getOpenIssues(): Observable<Iissue[]> {
        return this.getIssues().pipe(
            map((issues: Iissue[]) =>
                issues.filter((i) => i.issueStatus !== 'Closed')
            )
        );
    }

    /**
     * Gets a list of all Users in the database.
     * @return {Observable<Iissue[]>}
     */
    getUsers(): Observable<Iuser[]> {
        return this.http.get<Iuser[]>(this.getUsersAPI).pipe(
            tap((data) => console.log('All: ', JSON.stringify(data))),
            catchError(IssueService.handleError)
        );
    }

    /**
     * Get a list of all comments for a specific issue.
     * @param id - ID of issue to return.
     * @return {Observable<Icomment[]>}
     */
    getIssueComments(id: number): Observable<Icomment[]> {
        return this.http.get<Icomment[]>(this.getCommentsAPI + '/' + id).pipe(
            tap((data) => console.log('All: ', JSON.stringify(data))),
            catchError(IssueService.handleError)
        );
    }

    /**
     * Get a list of all Active Users in the database.
     * @return {Observable<Iissue[]>}
     */
    getActiveUsers(): Observable<Iuser[]> {
        return this.getUsers().pipe(
            map((user: Iuser[]) => user.filter((i) => i.userActive == true))
        );
    }

    /**
     * Handles any errors
     * @param err - Response from HTTP request
     * @return {any}
     * @private
     */
    private static handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
