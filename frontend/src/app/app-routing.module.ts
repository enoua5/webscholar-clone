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
import {CreateScholarshipFormComponent} from "./create-scholarship-form/create-scholarship-form.component";
import {NewPasswordComponent} from "./new-password-form/new-password.component";
import {ReportIssueFormComponent} from "./report-issue-form/report-issue-form.component";
import {IssuesComponent} from "./issues/issues.component";
import {ViewIssueComponent} from "./view-issue/view-issue.component";
import {ScholarshipListComponent} from "./scholarship-list/scholarship-list.component";
import { StudentViewScholarshipFormComponent } from './student-view-scholarship-form/student-view-scholarship-form.component';
import {RegistrationInvitationFormComponent} from "./registration-invitation-form/registration-invitation-form.component";
import { RequestRoleFormComponent } from './request-role-form/request-role-form.component';
import { PendingRoleRequestsComponent } from './pending-role-requests/pending-role-requests.component';
import {TermsConditionsComponent} from "./terms-conditions/terms-conditions.component";


const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'register-faculty', component: RegisterFormFacultyComponent},
  { path: 'forgot_password', component: ForgotPasswordFormComponent},
  { path: 'forgot_password_submission', component: ForgotPasswordSubmissionComponent},
  { path: 'edit_profile', component: EditProfileFormComponent },
  { path: 'change_password', component: ChangePasswordFormComponent},
  { path: 'issues/reportIssue', component: ReportIssueFormComponent},
  { path: 'issues/:id', component: ViewIssueComponent},
  { path: 'issues', component: IssuesComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'scholarship/create', component: CreateScholarshipFormComponent},
  { path: 'new_password', component: NewPasswordComponent},
  { path: 'scholarship', component: ScholarshipListComponent },
  { path: 'studentviewscholarship', component: StudentViewScholarshipFormComponent },
  { path: 'registration_invitation_form', component: RegistrationInvitationFormComponent},
  { path: 'roles/request', component : RequestRoleFormComponent},
  { path: 'roles/pending_requests', component: PendingRoleRequestsComponent},
  { path: 'terms_conditions', component: TermsConditionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
