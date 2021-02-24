import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {RegisterFormFacultyComponent} from "./register-form-faculty/register-form-faculty.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {ForgotPasswordFormComponent} from "./forgot-password-form/forgot-password-form.component";
import {ForgotPasswordSubmissionComponent} from "./forgot-password-submission/forgot-password-submission.component";
import {ChangePasswordFormComponent} from "./change-password-form/change-password-form.component";
import {EditProfileFormComponent} from "./edit-profile-form/edit-profile-form.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NewPasswordComponent} from "./new-password-form/new-password.component";

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'register-faculty', component: RegisterFormFacultyComponent},
  { path: 'forgot_password', component: ForgotPasswordFormComponent},
  { path: 'forgot_password_submission', component: ForgotPasswordSubmissionComponent},
  { path: 'edit_profile', component: EditProfileFormComponent },
  { path: 'change_password', component: ChangePasswordFormComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path : 'new_password', component: NewPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
