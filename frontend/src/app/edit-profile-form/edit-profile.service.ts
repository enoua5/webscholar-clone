import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

/** Class containing functions connecting the frontend to the backend for the edit_proile page */
@Injectable({
  providedIn: 'root',
})
export class EditProfileService{
  constructor(private http: HttpClient){

  }

  /**
   * Send a request to update an account
   * @param {string} data Stringified JSON containing the new account data
   * @returns {Observable} an Observable of the HTTPResponse for the request, with a response body
   */
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

  /**
   * Send a request to delete an account
   * @param {string} id The ID of the account to be deleted 
   * @returns  {Observable} an Observable of the HTTPResponse for the request, with a response body
   */
  public deleteAccount(id : string)
  {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    let urlString : string = 'http://localhost:6001/account/request_account_deletion/'+id;
    return this.http.get<any>(urlString, {headers: header, observe: 'response', responseType: 'json'}).pipe();
  }
}
