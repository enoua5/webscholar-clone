import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const INSERT_URL = 'http://localhost:6001/account/send_registration_invite/';

@Injectable({
  providedIn: 'root',
})
export class AccountService{
  constructor(private http: HttpClient){

  }

  public sendEmail(data): Observable<any> {
    //Call http get to send email
    let url_to_use = INSERT_URL;
    url_to_use += data;

    // responseType: text to accomodate how the response is provided by backend
    return this.http.get(url_to_use, {responseType: 'text'});
  }
}