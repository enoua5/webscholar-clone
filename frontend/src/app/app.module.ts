import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
import {NewPasswordComponent} from "./new-password-form/new-password.component";

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
    NewPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
