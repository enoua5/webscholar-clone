import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Iissue} from "./issue";
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) {
  }

  // ToDo: Replace placeholder with api to get Issues
  /**
   * Gets a list of all issues in the database.
   */
  getIssues(): Observable<Iissue[]> {
    return this.http.get<Iissue[]>('[placeholder]')
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  /**
   * Get's a specific issue.
   * @param id - ID of issue to return.
   */
  getIssue(id: number): Observable<Iissue> {
    return this.getIssues()
      .pipe(
        map((issues: Iissue[]) => issues.find(i => i.issueID === id))
      );
  }

  /**
   * Get's all Open Issues
   */
  getOpenIssues(): Observable<Iissue[]> {
    return this.getIssues()
      .pipe(
        map((issues: Iissue[]) => issues.filter(i => (i.issueStatus !== "Closed")))
      );
  }

  /**
   * Handles any errors
   * @param err - Response from HTTP request
   * @private
   */
  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
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
