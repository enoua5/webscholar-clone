/* eslint-env browser */

import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpRequest,
    HttpHeaderResponse
} from '@angular/common/http';
//import {Observable} from "rxjs";

// unused constants?
//const LOGIN_URL = 'http://localhost:8000/login.php';
// const INSERT_URL = 'http://localhost:6001/accounts';
// const headerDict = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Headers': 'Content-Type',
// }

/**
 * Registration Service
 */
@Injectable({
    providedIn: 'root'
})
/**
 * Class containing functions connecting the frontend to the backend for the registration page
 */
export class RegisterService {
    /**
     * Empty constructor
     * @param http
     */
    constructor(private http: HttpClient) {}

    // This creates a test account
    //public testAccountCreation(){
    //let header = new HttpHeaders({  'Content-Type': 'application/json',
    //'Accept': 'application/json',
    //'Access-Control-Allow-Headers': 'Content-Type',
    //})
    //Testing using make_test_account post method
    //return this.http.post('http://localhost:6001/account/make_test_account',{headers: header}, { observe: 'response', responseType: 'text'}).subscribe();
    //}

    /**
     * Sends a REST API request to create an account.
     *
     * See edu.weber.controller.AccountController:createNewAccount within the account-service microservice for
     * implementation.
     *
     * API endpoint is located at /account/create and is accessed via POST.
     * @param data Stringified JSON containing the data to create a new account with.
     */
    public createAccount(data) {
        let header = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        });

        //checking if data is not null
        console.log(data);

        return this.http
            .post<any>('http://localhost:6001/account/create', data, {
                headers: header,
                observe: 'response',
                responseType: 'json'
            })
            .pipe();
    }

    /**
     * Sends a REST API request to check if an email exists.
     *
     * See edu.weber.controller.AccountController:emailExists within the account-service microservice for implementation.
     *
     * API endpoint is located at /account/emailExists and is accessed via GET.
     * @param email {string} Email to send as request parameter
     */
    public emailExists(email: string) {
        return this.http
            .get('http://localhost:6001/account/emailExists', {
                params: { email: email }
            })
            .pipe();
    }
}
