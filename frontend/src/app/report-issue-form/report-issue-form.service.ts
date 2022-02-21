import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Iissue} from "../issues/issue";
import {never, Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReportIssueFormService {

  constructor(private http: HttpClient) { }

  createIssue(issue: Iissue) {
    let body = JSON.stringify(issue);
    // ToDo: Replace with API Call once backend team sets up API call to create an issue
    console.log(body);
    return this.http.post('{{placeholder}}', body, httpOptions);
  }

}
