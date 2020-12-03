import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const INSERT_URL = 'http://localhost:6001/register.php';

@Injectable({
  providedIn: 'root',
})
export class RegisterService{
  constructor(private http: HttpClient){

  }

  public insert(data): Observable<any> {
    return this.http.post(INSERT_URL, data);
  }

}
