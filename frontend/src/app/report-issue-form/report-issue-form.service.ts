import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iissue } from '../issues/issue';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ReportIssueFormService {
    constructor(private http: HttpClient) {}

    createIssue(issue: Iissue) {
        // make a new object to free us from the bonds of TypeScript
        let body_obj = Object({ ...issue });
        // Add in some data that the user doesn't get to choose
        body_obj.reporterId = parseInt(sessionStorage.getItem('accountKey'));
        body_obj.status = 'Unreviewed';
        // this field has a different name in the backend
        body_obj.stepsToReCreate = body_obj.recreate;
        delete body_obj.recreate;
        // Body needs to be a string
        let body = JSON.stringify(body_obj);
        console.log(body);
        return this.http.post(
            'http://localhost:6005/issue/createIssue',
            body,
            httpOptions
        );
    }
}
