import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService
{
  constructor(private http: HttpClient){}

  public changePassword(body_data)
  {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
  
    let accountKey = sessionStorage.getItem("accountKey");
    console.log("accountKey="+accountKey);

    return this.http.post<any>('http://localhost:6001/account/change_password/'+accountKey, body_data, { headers: header, observe: 'response', responseType: 'json'}).pipe();
  }
}