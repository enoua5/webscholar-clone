import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {RegisterFormFacultyComponent} from "./register-form-faculty/register-form-faculty.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {ForgotPasswordFormComponent} from "./forgot-password-form/forgot-password-form.component";
import {ForgotPasswordSubmissionComponent} from "./forgot-password-submission/forgot-password-submission.component";

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'register-faculty', component: RegisterFormFacultyComponent},
  { path: 'forgot_password', component: ForgotPasswordFormComponent},
  { path: 'forgot_password_submission', component: ForgotPasswordSubmissionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
