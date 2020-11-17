import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const LOGIN_URL = 'http://localhost:8000/login.php';

@Injectable({
  providedIn: 'root',
})
export class LoginService{
  constructor(private http: HttpClient){

  }

  public login(data): Observable<any>{
    return this.http.post(LOGIN_URL, data);
  }
}

