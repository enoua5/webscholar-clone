import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

// TODO: Replace the below URL with the one created by the backend team for role requests.
const INSERT_URL = 'http://localhost:6001/account/test_me';

@Injectable({
  providedIn: 'root',
})
export class RequestRoleService
{
  constructor(private http: HttpClient)
  {
    // Empty constructor; no body needed yet.
  }

  public insert(data): Observable<any> 
  {
    // TODO: Formally call the account service and send it our request with:
    // return this.http.post(INSERT_URL, data);

    // For now, this is just mocked to demonstrate that a request might actually be sent.
    return this.http.get(INSERT_URL, {responseType: 'text'});
  }
}
