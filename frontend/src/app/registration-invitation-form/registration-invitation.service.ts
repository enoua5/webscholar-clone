import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

// Url used in an API call
const INSERT_URL = 'http://localhost:6001/account/send_registration_invite/';

/**
 * Indicates that this service should be provided in the root injector
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Class containing functions responsible for connecting frontend with backend
 */
export class RegistrationInvitationService{
  /**
   * Empty constructor
   * @param http 
   */
  constructor(private http: HttpClient){}

   /**
   * Sends an email using an HTTP GET request.
   * @param data - Data to be sent with the email request.
   * @returns An observable that resolves with the response from the email request.
   */
  public sendEmail(data): Observable<any> {
    //Call http get to send email
    let url_to_use = INSERT_URL;
    url_to_use += data;

    // responseType: text to accomodate how the response is provided by backend
    return this.http.get(url_to_use, {responseType: 'text'});
  }
}