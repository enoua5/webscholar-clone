import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, map, of } from 'rxjs';
import { forEach } from 'cypress/types/lodash';

// TODO: Replace the below URL with the one created by the backend team for role requests.
/**
 * URL used to sned an API call
 */
const INSERT_URL = 'http://localhost:6001/account/process-role-request';
const GET_URL = 'http://localhost:6001/account/get-all-role-requests';
/**
 * Declare our Request and RequestList types so we don't have to copy them over and over.
 */
type Request = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
};

/**
 * List of requests to send
 */
type RequestList = Request[];

/**
 * Indicates that this service should be provided in the root injector
 */
@Injectable({
    providedIn: 'root'
})

/**
 * Class containing functions responsible for connecting frontend with backend
 */
export class PendingRoleRequestsService {
    /**
     * Empty constructor
     * @param http HttpClient
     */
    constructor(private http: HttpClient) {}

    /**
     * Queries the account services API to get all of the current role requests.
     *
     * @returns A list of all of the current role requests.
     */
    public getRequests(): Observable<RequestList> {
        return this.http
            .get<any>('http://localhost:6001/account/get-all-role-requests')
            .pipe(
                map((response) => this.parseRequests(response)),
                catchError((error) => {
                    console.error(error);
                    return of([]);
                })
            );
    }

    /**
     * Parses the given array and gets in in a format of RequestList
     *
     * @param parseRequests The raw array returned by our API call.
     * @returns A list of all of the request objects found.
     */
    private parseRequests(requests: []): any {
        let requestList: RequestList = [];
        //let raw_json = JSON.parse(roleRequestJSON);
        requests.forEach((request) => {
            requestList.push({
                id: request['accountId'],
                first_name: request['firstName'],
                last_name: request['lastName'],
                email: request['email'],
                role: request['role']
            });
        });

        return requestList;
    }

    /**
     * Approves the given requests and removes them from our request list, if successful.
     *
     * @param requestList A list of the requests that we're approving.
     * @returns A list of error messages on failure, or nothing on success.
     */
    public async approveRequests(
        requestList: RequestList
    ): Promise<string[] | undefined> {
        let errorQueue: string[] = [];

        for await (const request of requestList) {
            let success = await this.approveRequest(request);

            if (!success) {
                errorQueue.push(
                    'Failed to approve request for: ' +
                        request['last_name'] +
                        ', ' +
                        request['first_name'] +
                        '.'
                );
            }
        }

        return errorQueue.length > 0 ? errorQueue : undefined;
    }

    /**
     * Sends a request to the backend to approve a single role request.
     *
     * @param request The request to approve.
     * @returns True if the request was succesfully approved on the backend; false otherwise.
     */
    private async approveRequest(request: Request): Promise<boolean> {
        let success = true;
        let header = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        let body = JSON.stringify({
            accountId: request.id,
            isApproved: true,
            role: request.role
        });

        const observable = this.http.post<any>(INSERT_URL, body, {
            headers: header,
            observe: 'response',
            responseType: 'json'
        });

        try {
            const response = await lastValueFrom(observable);
            success = this.processResponse(response);
        } catch (error) {
            success = false;
        }

        return success;
    }

    /**
     * Denies the given requests and removes them from our request list, if successful.
     *
     * @param requestID A list of the requests that we're denying.
     * @returns A list of error messages on failure, or nothing on success.
     */
    public async denyRequests(
        requestList: RequestList
    ): Promise<string[] | undefined> {
        let errorQueue: string[] = [];

        for await (const request of requestList) {
            let success = await this.denyRequest(request);

            if (!success) {
                errorQueue.push(
                    'Failed to deny request for: ' +
                        request['last_name'] +
                        ', ' +
                        request['first_name'] +
                        '.'
                );
            }
        }

        return errorQueue.length > 0 ? errorQueue : undefined;
    }

    /**
     * Sends a request to the backend to deny a single role request.
     *
     * @param requestID The request to deny.
     * @returns True if the request was succesfully denied on the backend; false otherwise.
     */
    private async denyRequest(request: Request): Promise<boolean> {
        let success = true;
        let header = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        let body = JSON.stringify({
            accountId: request.id,
            isApproved: false,
            role: request.role
        });

        const response = await this.http
            .post<any>(INSERT_URL, body, {
                headers: header,
                observe: 'response',
                responseType: 'json'
            })
            .toPromise();
        success = this.processResponse(response);

        return success;
    }

    /**
     * Processes the HTTP response from the backend and determines if it contains any errors.
     *
     * @param response The response from the backend to our API call.
     * @returns True if the response indicates success; false otherwise.
     */
    private processResponse(response): boolean {
        if (response.status != 200) {
            console.log(response);
            return false;
        }
        return true;
    }
}
