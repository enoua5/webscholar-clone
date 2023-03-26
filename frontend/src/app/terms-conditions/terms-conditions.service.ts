import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * TODO: this is a test link!
 * As of right now, Terms and Conditions are hardcoded into HTML.
 * Instead, there could be a backend service providing the terms and conditions data.
 */ 
const INSERT_URL = 'http://localhost:6001/account/test_me';

/**
 * Indicates that this service should be provided in the root injector
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Class containing functions responsible for connecting frontend with backend
 */
export class TermsConditionsService
{
  /**
   * Empty constructor
   * @param http 
   */
  constructor(private http: HttpClient){}

  /**
   * Sends an API request to the backend.
   * 
   * TODO:
   * In a future, it should retreive the Terms Conditions from the backend
   * @returns An observable that resolves with the response from the email request.
   */
  public retrieve(): Observable<any> 
  {
    // TODO: this would change depending on how the Terms and Conditions are provided 
    return this.http.get(INSERT_URL, {responseType: 'text'});
  }
}