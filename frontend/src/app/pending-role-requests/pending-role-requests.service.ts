import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

// TODO: Replace the below URL with the one created by the backend team for role requests.
/**
 * URL used to sned an API call
 */
const INSERT_URL = 'http://localhost:6001/account/create';

/**
 * Declare our Request and RequestList types so we don't have to copy them over and over.
*/
type Request = 
{
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  role: string,
};

/**
 * List of requests to send
 */
type RequestList = Request[];

/**
 * Indicates that this service should be provided in the root injector
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Class containing functions responsible for connecting frontend with backend
 */
export class PendingRoleRequestsService
{
  /**
   * Empty constructor
   * @param http HttpClient
   */
  constructor(private http: HttpClient){}

  /**
   * Queries the account services API to get all of the current role requests.
   * 
   * @returns A list of all of the current role requests.
   */
  public getRequests(): RequestList
  {
    // These requests will likely be returned as JSON strings, so we're going to mock the
    // receipt and parsing of these JSON strings into arrays.
    let requestList = []
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

      // TODO: Get the actual JSON result from the backend API.
      try{
        requestList = this.parseRequestJSON(mock_json);
      }catch(e){}

      return requestList;
  }

  /**
   * Parses the given JSON string and adds any request objects found into a list.
   * 
   * @param roleRequestJSON The raw JSON string returned by our API call.
   * @returns A list of all of the request objects found.
   */
  private parseRequestJSON(roleRequestJSON: string): any
  {
    let requestList: RequestList = [];
    let raw_json = JSON.parse(roleRequestJSON);

    // Iterates over returned JSON and adds its requests into our array.
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
   * Approves the given requests and removes them from our request list, if successful.
   * 
   * @param requestList A list of the requests that we're approving.
   * @returns A list of error messages on failure, or nothing on success. 
   */
  public async approveRequests(requestList: RequestList): Promise<string[] | undefined>
  {
    let errorQueue: string[] = [];

    for await (const request of requestList)
    {
      let success = await this.approveRequest(request);

      if (!success)
      {
        errorQueue.push("Failed to approve request for: " + request['last_name'] + ", " + request['first_name'] + ".")
      }
    }

    return (errorQueue.length > 0 ? errorQueue : undefined);
  }

  /**
   * Sends a request to the backend to approve a single role request.
   * 
   * @param request The request to approve.
   * @returns True if the request was succesfully approved on the backend; false otherwise.
   */
  private async approveRequest(request: Request): Promise<boolean>
  {
    let success = true;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    let body = JSON.stringify({id: request.id, approved: true});
    
    const response = await this.http.post<any>(INSERT_URL, body, { headers: header, observe: 'response', responseType: 'json'}).toPromise();
    success = this.processResponse(response);

    return success;
  }

  /**
   * Denies the given requests and removes them from our request list, if successful.
   * 
   * @param requestID A list of the requests that we're denying.
   * @returns A list of error messages on failure, or nothing on success. 
   */
  public async denyRequests(requestList: RequestList): Promise<string[] | undefined>
  {
    let errorQueue: string[] = [];

    for await (const request of requestList)
    {
      let success = await this.denyRequest(request);

      if (!success)
      {
        errorQueue.push("Failed to deny request for: " + request['last_name'] + ", " + request['first_name'] + ".")
      }
    }

    return (errorQueue.length > 0 ? errorQueue : undefined);
  }

  /**
   * Sends a request to the backend to deny a single role request.
   * 
   * @param requestID The request to deny.
   * @returns True if the request was succesfully denied on the backend; false otherwise.
   */
  private async denyRequest(request: Request): Promise<boolean>
  {
    let success = true;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    let body = JSON.stringify({id: request.id, approved: false});
    
    const response = await this.http.post<any>(INSERT_URL, body, { headers: header, observe: 'response', responseType: 'json'}).toPromise();
    success = this.processResponse(response);

    return success;
  }

  /**
   * Processes the HTTP response from the backend and determines if it contains any errors.
   * 
   * @param response The response from the backend to our API call.
   * @returns True if the response indicates success; false otherwise.
   */
  private processResponse(response): boolean
  {
    if (response.status != 200)
    {
      console.log(response)
      return false;
    }
    return true;
  }
}
