import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

let INSERT_URL = 'http://localhost:6001/account/send_registration_invite/';

@Injectable({
  providedIn: 'root',
})
export class AccountService{
  constructor(private http: HttpClient){

  }

  public sendEmail(data): Observable<any> {
    INSERT_URL += data;
    return this.http.get(INSERT_URL, data);
  }

}
