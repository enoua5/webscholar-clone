import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "./registration-invitation.service";

@Component({
  selector: 'app-registration-invitation-form',
  templateUrl: './registration-invitation-form.component.html',
  styleUrls: ['./registration-invitation-form.component.less']
})
export class RegistrationInvitationFormComponent implements OnInit {
  form: FormGroup;
  emails: string[];
  fullPath: string = "";
  separator: string = "";
  error: string = null;
  type: boolean;
  errors: Map<string, string> = new Map();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private service: AccountService) {
    this.form = this.fb.group({
      emails: [''],
    });
  }

  ngOnInit(): void {
    const uriParam = this.route.snapshot.paramMap.get('type');
    if(uriParam == "chairInvitation"){
      this.type = true;
    } else this.type = false;
  }

  private checkErrors(): void {
    this.errors.clear();

    //Check email
    const validEmail = RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    for(let i = 0; i < this.emails.length; i++){
      if (this.emails[i].length == 0 || !validEmail.test(this.emails[i])) {
        this.errors.set('emails', 'Invalid email');
      }
    }
    // if (this.form.get('emails').value.length == 0 || !validEmail.test(this.form.get('emails').value)) {
    //   this.errors.set('emails', 'Invalid email');
    // }
  }

  private createEmailArray(): void {
    const stringList = this.form.get('emails').value;
    this.emails = stringList.split(',');
  }

  onSubmit(): void {
    this.createEmailArray()
    console.log(this.emails);
    this.checkErrors();
    if (this.errors.size == 0) {
      if(this.type){
        this.fullPath += "chair";
      } else this.fullPath += "committeeMember"
      this.fullPath += "/?recipientEmails=";
      for(let i = 0; i < this.emails.length; i++){
        this.fullPath += this.separator + this.emails[i];
        this.separator = ",";
      }
      console.log(this.fullPath);
      this.service.sendEmail(this.fullPath).subscribe((data) => this.processResponse(data));
    }
  }

  private processResponse(data) {
    console.log("Success")
    if (data.success == true) {
      this.router.navigate(['../dashboard']);
      this.errors.clear();
    }
    else {
      console.warn('Else Statement executed');
      this.error = data.error;
      this.errors = new Map(Object.entries(data.errors));
    }
  }
}