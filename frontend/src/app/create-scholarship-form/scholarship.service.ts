import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class ScholarshipService{

  constructor(private http: HttpClient){

  }

  // This method is for account creation
  public createScholarship(data){
    let header = new HttpHeaders({  'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    //checking if data is not null
    console.log(data);

    return this.http.post<any>('http://localhost:6001/AccountScholarship/create', data, { headers: header, observe: 'response', responseType: 'json'}).pipe();
  }
}
