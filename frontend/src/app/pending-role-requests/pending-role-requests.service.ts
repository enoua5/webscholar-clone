import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

// TODO: Replace the below URL with the one created by the backend team for role requests.
const INSERT_URL = 'http://localhost:6001/account/test_me';

@Injectable({
  providedIn: 'root',
})
export class PendingRoleRequestsService
{
  constructor(private http: HttpClient)
  {
    // Empty constructor; no body needed yet.
  }
  
  /**
   * Parses the given JSON string into a list of objects.
   * 
   * @param roleRequestJSON The raw JSON string returned by our API call.
   * @returns A list of all of the role requests found in the JSON.
   */
  private parseRequestJSON(roleRequestJSON: string): any
  {
    let requestList: {id: number,
                      first_name: string,
                      last_name: string,
                      email: string,
                      role: string,
                     }[] = [];
    
    let raw_json = JSON.parse(roleRequestJSON);

    // Iterates over returned JSON and adds its requests into an array.
    raw_json["requests"].forEach(request => {
      requestList.push({
        id: request["id"],
        first_name: request["first_name"],
        last_name: request["last_name"],
        email: request["email"],
        role: request["role"]
    })});

    return requestList;
  }

  /**
   * Queries the account services API to get all of the current role requests.
   * 
   * @param data 
   * @returns A list of all of the current role requests.
   */
  public getRequests(): any
  {
    // These requests will likely be returned as JSON strings, so we're going to mock the
    // receipt and parsing of these JSON strings into parseable arrays.
    let mock_json = `{
                        "requests": 
                        [
                          {
                            "id": "1",
                            "first_name": "Professor",
                            "last_name": "Bean",
                            "email": "professorbean@tarplms.edu",
                            "role": "Chair"
                          },
                          {
                            "id": "2",
                            "first_name": "Billy",
                            "last_name": "Joel",
                            "email": "billy.joel@gmail.com",
                            "role": "Member"
                          },
                          {
                            "id": "3",
                            "first_name": "Anna",
                            "last_name": "Karenina",
                            "email": "trainlady123@hotmail.com",
                            "role": "Chair"
                          }
                        ]
                      }`;

      let requestList = this.parseRequestJSON(mock_json);
      return requestList;
  }
}
