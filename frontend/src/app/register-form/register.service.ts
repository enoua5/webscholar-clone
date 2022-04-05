import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest, HttpHeaderResponse} from "@angular/common/http";
import {Observable} from "rxjs";

const LOGIN_URL = 'http://localhost:8000/login.php';
// const INSERT_URL = 'http://localhost:6001/accounts';
const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService{

  constructor(private http: HttpClient){

  }

  // This creates a test account
  //public testAccountCreation(){
    //let header = new HttpHeaders({  'Content-Type': 'application/json',
      //'Accept': 'application/json',
      //'Access-Control-Allow-Headers': 'Content-Type',
    //})
    //Testing using make_test_account post method
    //return this.http.post('http://localhost:6001/account/make_test_account',{headers: header}, { observe: 'response', responseType: 'text'}).subscribe();
  //}

  // This method is for account creation
  public createAccount(data){
     let header = new HttpHeaders({  'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Access-Control-Allow-Headers': 'Content-Type',
     });

     //checking if data is not null
     console.log(data);

     return this.http.post<any>('http://localhost:6001/account/create', data, { headers: header, observe: 'response', responseType: 'json'}).pipe();
  }

  public emailExists(email: string) {
    return this.http.get('http://localhost:6001/account/emailExists', {params: {email: email}}).pipe();
  }

  //Not sure what this method was doing with the old INSERT_URL
  // public insert(data): Observable<any> {
  //   return this.http.post(INSERT_URL, data);
 //}

}
