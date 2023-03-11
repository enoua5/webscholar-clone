import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService{
  constructor(private http: HttpClient){

  }

  public emailExists(email: string) {
    return this.http.get('http://localhost:6001/account/emailExists', {params: {email: email}}).pipe();
  }

  public forgotPassword(data){
    let header = new HttpHeaders({  'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    return this.http.post<any>('http://localhost:6001/forgot_password', data, { headers: header, observe: 'response', responseType: 'json'}).pipe();
  }

  /*
  public login(data): Observable<any>{
    return this.http.post(LOGIN_URL, data);
  }
  */
}

