import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class EditProfileService{
  constructor(private http: HttpClient){

  }

  public updateAccount(data){
    let header = new HttpHeaders({  'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    console.log(data);

    // get user account key from storage to call api
    let urlString : string = 'http://localhost:6001/account/update/' + sessionStorage.getItem('accountKey');
    return this.http.post<any>(urlString, data, { headers: header, observe: 'response', responseType: 'json'}).pipe();
  }
}
