// ToDO: Limit page to only be viewable if the user is logged in.
// ToDO: Redirect back to list of issues once that page is set up.
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReportIssueFormService} from "./report-issue-form.service";

@Component({
  selector: 'app-report-issue-form',
  templateUrl: './report-issue-form.component.html',
  styleUrls: ['./report-issue-form.component.less']
})
export class ReportIssueFormComponent implements OnInit {
  reportIssueForm: FormGroup;
  severityList: string[] = [
    'Critical',
    'Major',
    'Moderate',
    'Minor',
    'Cosmetic'
  ];
  priorityList: string[] = [
    'Low',
    'Medium',
    'High'
  ]
  errorMessage: string = "";
  validMessage: string = "";


  constructor(private reportIssueFormService: ReportIssueFormService) { }

  ngOnInit(): void {
    this.reportIssueForm = new FormGroup({
      reporter: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      severity: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required)
    })
  }

  SubmitIssue() {
    if (this.reportIssueForm.valid) {
      this.errorMessage = "";
      this.validMessage = "";
      this.reportIssueFormService.createIssue(this.reportIssueForm.value).subscribe(
        data => {
          this.reportIssueForm.reset();
          this.validMessage = "Your issue has been reported. Thank you!";
          return true;
        },
        error => {
          this.errorMessage = error;
        }
      )
    } else {
      this.validMessage = "";
        this.errorMessage = "Please fill out the form before submitting!";
    }
  }

  // form: FormGroup;
  // errors: Map<string, string> = new Map();
  // constructor(
  //   private fb: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private service: RegisterService) {
  //   this.form = this.fb.group({
  //     issueName: [''],
  //     email: [''],
  //     issueType: [''],
  //     issueDescription: ['']
  //   });
  // }
  //
  // private checkErrors(): void {
  //   this.errors.clear();
  //
  //   //Issue Name verification
  //   if (this.form.get('issueName').value.length == 0) {
  //     this.errors.set('issueName', 'Invalid Issue Name');
  //   }
  //
  //   //Email verification
  //   const validEmail = RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
  //   if (!validEmail.test(this.form.get('email').value) || this.form.get('email').value.length == 0) {
  //     this.errors.set('email', 'Invalid email format');
  //   }
  //
  //   //Issue Type Verification
  //   if(this.form.get('issueType').value == ""){
  //     this.errors.set ('issueType', 'You Must Select an Issue Type')
  //   }
  //
  //   //issue Description Verification
  //   if (this.form.get('issueDescription').value.length == 0) {
  //     this.errors.set('issueDescription', 'You Must Describe the Issue');
  //   }
  //
  // }
  //
  // onSubmit(): void {
  //
  //   console.log(this.form.value);
  //   this.checkErrors();
  //
  //   const issueName = this.form.get('issueName').value;
  //   const email = this.form.get('email').value;
  //   const issueType = this.form.get('issueType').value;
  //   const issueDescription = this.form.get('issueDescription').value;
  //
  //
  //   if(this.errors.size == 0){
  //     // this.service.insert(this.form.value)
  //     //   .subscribe((data) => this.processResponse(data));
  //     const jsonObj = JSON.stringify({
  //       issueName: issueName,
  //       issueType: issueType,
  //       email: email,
  //       issueDescription: issueDescription
  //
  //     });
  //
  //     console.log(jsonObj);
  //     //this.service.testAccountCreation().subscribe((data) => this.processResponse(data));
  //
  //   }
  //
  // }
  //
  // private processResponse(data) {
  //   console.log(data);
  //   if (data.success == true) {
  //     this.router.navigate(['/dashboard']);
  //   }
  //   else {
  //     console.warn('Else Statement executed');
  //     this.error = data.error;
  //     this.errors = new Map(Object.entries(data.errors));
  //   }
  // }
}
