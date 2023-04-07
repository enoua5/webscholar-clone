import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Class for managing API calls for the `/change_password` page
 */
@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService {
    /**
     * While this constructor is empty, it still constucts the HttpClient object
     * and assigns it to the `http` private member variable
     *
     * @param http HTTP request handler
     */
    constructor(private http: HttpClient) {}

    /**
     * Sends a REST API request to change password.
     *
     * See `edu.weber.controller.AccountController:changePassword` within the account-service microservice for implementation.
     *
     * API endpoint is located at `/account/change_password/{accountKey}` and is accessed via POST.
     *
     * @param body_data A stringified JSON object containing the fields `currentPassword` and `newPassword`
     * @returns {Observable}
     */
    public changePassword(body_data) {
        let header = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        });

        let accountKey = sessionStorage.getItem('accountKey');
        console.log('accountKey=' + accountKey);

        return this.http
            .post<any>(
                'http://localhost:6001/account/change_password/' + accountKey,
                body_data,
                { headers: header, observe: 'response', responseType: 'json' }
            )
            .pipe();
    }
}
