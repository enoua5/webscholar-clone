import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationInvitationService} from "./registration-invitation.service";

/**
 * Registration Invitations Component
 */
@Component({
  selector: 'app-registration-invitation-form',
  templateUrl: './registration-invitation-form.component.html',
  styleUrls: ['./registration-invitation-form.component.less']
})

/**
 * Interacts with the invitation form on the page
 */
export class RegistrationInvitationFormComponent implements OnInit {
  /**
   * Form group object
   */
  form: FormGroup;

  /**
   * Array of emails to send invites to
   */
  emails: string[];

  /**
   * String grabbed from the input 
   */
  fullPath: string = "";

  /**
   * Needed to put together an API call URL
   */
  separator: string = "";

  /**
   * Will contain any error messages 
   */
  error: string = null;

  /**
   * Type determines what page it is - for Chair or Faculty invites
   */
  type: boolean;

  /**
   *  Map used for storing errors returned from backend
   */
  errors: Map<string, string> = new Map();

  /**
   * Builds the form and sets up the validators for each field
   * @param fb fb ForbBuilder dependency
   * @param route Route dependency
   * @param router Router dependency
   * @param service AccountService dependency
   */
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private service: RegistrationInvitationService) {
    this.form = this.fb.group({
      emails: [''],
    });
  }

  /**
   * Runs when page is loaded, determines what form needs to be displayed -
   * one for Chair invites and one for Faculty invites
   */
  ngOnInit(): void {
    const uriParam = this.route.snapshot.paramMap.get('type');
    if(uriParam == "chairInvitation"){
      this.type = true;
    } else this.type = false;
  }

  /**
   * Valudates if the emails provided are valid or not
   */
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

  /**
   * A helper method
   * Grabs emails fron an input box and converts them into an array format
   */
  private createEmailArray(): void {
    const stringList = this.form.get('emails').value;
    this.emails = stringList.split(',');
  }

  /**
   * Executes when send button is pressed
   * Assembles the api call with all the emails provided in the form
   */
  onSubmit(): void {
    this.createEmailArray()
    console.log(this.emails);
    this.checkErrors();
    if (this.errors.size == 0) {
      if(this.type){
        this.fullPath += "chair";
      } else this.fullPath += "committeeMember"

      // Get the ID of a currently logged in user.
      this.fullPath += "/?accountKey=";
      this.fullPath += sessionStorage.getItem('accountKey');

      this.fullPath += "&recipientEmails=";
      for(let i = 0; i < this.emails.length; i++){
        this.fullPath += this.separator + this.emails[i];
        this.separator = ",";
      }
      console.log(this.fullPath);
      this.service.sendEmail(this.fullPath).subscribe((data) => this.processResponse(data));
    }
  }

  /**
   * Runs after the response is received. Displays error if backend returns errors
   * @param data the response backend sends
   */
  private processResponse(data) {
    console.log("Success")

    // Condition is based on what kind of response backend provides
    if (data === "Email sending successful.") {
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
