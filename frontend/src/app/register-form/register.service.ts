import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest, HttpHeaderResponse} from "@angular/common/http";
import {Observable} from "rxjs";

// const INSERT_URL = 'http://localhost:6001/accounts';


@Injectable({
  providedIn: 'root',
})
export class RegisterService{

  //private testAccountURL: string;
  private createAccountURL: string;

  constructor(private http: HttpClient){
    //this.testAccountURL = 'http://localhost:6001/account/make_test_account';
    this.createAccountURL = 'http://localhost:6001/account/create';
  }


  // public testAccountCreation(){
  //   //const dataJ = JSON.stringify(data);
  //   let header = new HttpHeaders({  'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //   })
  //   //Testing using make_test_account post method
  //   return this.http.post(this.testAccountURL,{headers: header});
  // }

  // This method is for account creation
  public createAccount(data){
    let header = new HttpHeaders({  'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })

    //checking if data is not null
    console.log(data);

    return this.http.post<any>(this.createAccountURL, data,{headers: header});
  }



  //Not sure what this method was doing with the old INSERT_URL
  // public insert(data): Observable<any> {
  //   return this.http.post(INSERT_URL, data);
  // }

}
