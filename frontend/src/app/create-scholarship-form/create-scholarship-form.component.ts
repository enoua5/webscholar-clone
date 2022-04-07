import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ScholarshipService} from "../create-scholarship-form/scholarship.service";

@Component({
  selector: 'app-create-scholarship-form',
  templateUrl: './create-scholarship-form.component.html',
  styleUrls: ['./create-scholarship-form.component.less']
})
export class CreateScholarshipFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ScholarshipService) {

    this.form = this.fb.group({
      scholarshipName: ['', Validators.required],
      scholarshipProvider: ['', Validators.required],
      scholarshipAmount: ['', Validators.required],
      scholarshipInfo: ['', Validators.required],
    });
  }

  // Getters for form controls
  get scholarshipName() {
    return this.form.get('scholarshipName');
  }

  get scholarshipProvider() {
    return this.form.get('scholarshipProvider');
  }

  get scholarshipAmount() {
    return this.form.get('scholarshipAmount');
  }

  get scholarshipInfo() {
    return this.form.get('scholarshipInfo');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (this.form.valid) {
      console.log(this.form.value);

      const jsonObj = JSON.stringify({
        scholarshipName: this.scholarshipName.value,
        scholarshipProvider: this.scholarshipName.value,
        scholarshipAmount: this.scholarshipAmount.value,
        scholarshipInfo: this.scholarshipInfo.value
      });

      console.log(jsonObj)

      this.service.createScholarship(jsonObj).subscribe( res => {
        console.log("Form has been Submitted")
      });
    }
  }
}
