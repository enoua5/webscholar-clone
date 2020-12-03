import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const INSERT_URL = 'http://localhost:8000/register.php';

@Injectable({
  providedIn: 'root',
})
export class RegisterService{
  constructor(private http: HttpClient){

  }

  public insert(data): Observable<any> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,POST,PUT,PATCH',
      'Access-Control-Allow-Headers' : 'content-type'
    })
    return this.http.post(INSERT_URL, data, {headers: headers});
  }

}
