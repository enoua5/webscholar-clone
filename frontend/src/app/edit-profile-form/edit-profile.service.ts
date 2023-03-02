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

    //checking if data is not null
    console.log(data);

    let urlString : string = 'http://localhost:6001/account/update/' + sessionStorage.getItem('accountKey');
    // TODO: figure out how to get the current account key, then pass it as part of the url
    return this.http.post<any>(urlString, data, { headers: header, observe: 'response', responseType: 'json'}).pipe();
  }
}
