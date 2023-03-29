import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * The API endpoint for the account service's role requests.
 */
const URL = 'http://localhost:6001/account/request_role/';

/**
 * Injects the HttpClient that this service will use.
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Definition for the RequestRoleService class.
 * 
 * @details This class facilitates the sending and receiving of role requests to and from the backend.
 */
export class RequestRoleService
{
  /**
   * Constructor for the RequestRoleService.
   * 
   * @param http The HttpClient to use with this service.
   */
  constructor(private http: HttpClient)
  {
    // Empty constructor; no body needed yet.
  }

  /**
   * Sends a role request for the currently logged-in user to the backend.
   * 
   * @param selectedRole The role that the user has selected on the Request Role form.
   * @returns The HTTP response from the backend.
   */
  public sendRequest(selectedRole): Observable<any> 
  {
    const header = new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    const body = selectedRole;

    const FULL_URL = URL + sessionStorage.getItem("accountKey");
    return this.http.post(FULL_URL, body, { headers: header });
  }

}
