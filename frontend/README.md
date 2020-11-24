#Install the Angular
1. install ng command:
npm install -g @angular/cli

2. go to the dir frontend

3. To run frontend application
ng serve --open

It will run browser with URL http://localhost:4200

#URLs
1.Login URL in: frontend/src/app/login-form/login.service.ts
2.Register URL in: frontend/src/app/register-form/register.service.ts

#Request Response data
1.Login
request:
```json 
{
"username":"test",
"password":"12345"
}
```
error response:
```json
{
"success":false,
"error":"User does not exist."
}
```
success response:
```json
{
"success":true
}
```
2.Register
request:
```json
{
 "username": "test",
 "password": "12345",
 "school_email": "test@mail.com",
 "school_id": "W12345678"
}
```
error response:
```json
{
"success":false,
 "error":null,
 "errors":{"school_email":"User with this email already exist."}
}
```
success response:
```json
{
"success":true
}
```
