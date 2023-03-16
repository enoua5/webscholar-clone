import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

// TODO: this is a test link!
// As of right now, Terms and Conditions are hardcoded into HTML.
// Instead, there could be a backend service providing the terms and conditions data.
const INSERT_URL = 'http://localhost:6001/account/test_me';

@Injectable({
  providedIn: 'root',
})

export class TermsConditionsService
{
  constructor(private http: HttpClient)
  {
    // Empty constructor
  }

  public retrieve(): Observable<any> 
  {
    // TODO: this would change depending on how the Terms and Conditions are provided 
    return this.http.get(INSERT_URL, {responseType: 'text'});
  }
}