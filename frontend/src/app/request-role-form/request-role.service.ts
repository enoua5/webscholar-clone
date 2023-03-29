import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = 'http://localhost:6001/account/request_role/';

@Injectable({
  providedIn: 'root',
})
export class RequestRoleService
{
  constructor(private http: HttpClient)
  {
    // Empty constructor; no body needed yet.
  }

  public sendRequest(data): Observable<any> 
  {
    const header = new HttpHeaders({
      'Content-Type': 'text/plain',
      'Accept': '*/*',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent'
    });
    const body = data;

    const FULL_URL = URL + sessionStorage.getItem("accountKey");
    return this.http.post(FULL_URL, body, {headers: header, observe: 'response'}).pipe();
  }

}
