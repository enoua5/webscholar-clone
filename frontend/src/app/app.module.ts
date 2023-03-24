import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { ForgotPasswordSubmissionComponent } from './forgot-password-submission/forgot-password-submission.component';
import { RegisterFormFacultyComponent } from './register-form-faculty/register-form-faculty.component';
import { HttpClientModule} from "@angular/common/http";
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NewPasswordComponent } from "./new-password-form/new-password.component";
import { CreateScholarshipFormComponent } from './create-scholarship-form/create-scholarship-form.component';
import { ReportIssueFormComponent } from './report-issue-form/report-issue-form.component';
import { IssuesComponent } from "./issues/issues.component";
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { ScholarshipListComponent } from './scholarship-list/scholarship-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentViewScholarshipFormComponent } from './student-view-scholarship-form/student-view-scholarship-form.component';
import { RegistrationInvitationFormComponent } from './registration-invitation-form/registration-invitation-form.component';
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { CommitteeComponent } from './scholarship-committee/committee.component';
import { ScoringComponent } from './Committee-Scoring/scoring.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ForgotPasswordFormComponent,
    ForgotPasswordSubmissionComponent,
    RegisterFormFacultyComponent,
    EditProfileFormComponent,
    ChangePasswordFormComponent,
    DashboardComponent,
    NewPasswordComponent,
    CreateScholarshipFormComponent,
    ReportIssueFormComponent,
    IssuesComponent,
    ViewIssueComponent,
    ScholarshipListComponent,
    NavbarComponent,
    StudentViewScholarshipFormComponent,
    RegistrationInvitationFormComponent,
    TermsConditionsComponent,
    CommitteeComponent,
    ScoringComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'registration_invitation_form/:type', component: RegistrationInvitationFormComponent }
    ]),
    RouterTestingModule,
    HttpClientTestingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
