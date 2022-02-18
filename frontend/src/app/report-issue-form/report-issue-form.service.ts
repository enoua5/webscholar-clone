import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReportIssueFormService {

  constructor(private http: HttpClient) { }

  createIssue(issue) {
    let body = JSON.stringify(issue);
    // ToDo: Replace with API Call once backend team sets up API call to create an issue
    console.log(body);
    return this.http.post('{{placeholder}}', body, httpOptions);
  }
}
