import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

// There is a login.php, but not sure how that's associated with port 8000
//const LOGIN_URL = 'http://localhost:8000/login.php';

/**
 * Login Service
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Class containing functions connecting the frontend to the backend for the login page
 */
export class LoginService{
  /**
   * Empty constructor
   * @param http
   */
  constructor(private http: HttpClient){}

  /**
   * Sends a REST API request to check if an email exists.
   *
   * See edu.weber.controller.AccountController:emailExists within the account-service microservice for implementation.
   *
   * API endpoint is located at /account/emailExists and is accessed via GET.
   * @param email {string} Email to send as request parameter
   */
  public emailExists(email: string) {
    return this.http.get('http://localhost:6001/account/emailExists', {params: {email: email}}).pipe();
  }

  /**
   * Sends a REST API request to login.
   *
   * See edu.weber.controller.AccountController:login within the account-service microservice for implementation.
   *
   * API endpoint is located at /account/login and is accessed via POST.
   * @param data Stringified JSON containing the data to attempt the login process with.
   */
  public login(data){
    let header = new HttpHeaders({  'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    return this.http.post<any>('http://localhost:6001/account/login', data, { headers: header, observe: 'response', responseType: 'json'}).pipe();
  }
}

