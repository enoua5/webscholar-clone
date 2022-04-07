import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

// There is a login.php, but not sure how that's associated with port 8000
const LOGIN_URL = 'http://localhost:8000/login.php';

@Injectable({
  providedIn: 'root',
})
export class LoginService{
  constructor(private http: HttpClient){

  }

  public emailExists(email: string) {
    return this.http.get('http://localhost:6001/account/emailExists', {params: {email: email}}).pipe();
  }

  public login(data){
    let header = new HttpHeaders({  'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    return this.http.post<any>('http://localhost:6001/account/login', data, { headers: header, observe: 'response', responseType: 'json'}).pipe();
  }

  /*
  public login(data): Observable<any>{
    return this.http.post(LOGIN_URL, data);
  }
  */
}

