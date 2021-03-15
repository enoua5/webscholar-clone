import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterService} from "../register-form/register.service";

@Component({
  selector: 'app-create-scholarship-form',
  templateUrl: './create-scholarship-form.component.html',
  styleUrls: ['./create-scholarship-form.component.less']
})
export class CreateScholarshipFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private service: RegisterService) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
      confirm_password: [''],
      school_email: [''],
      school_id: [''],
      checkbox: ['']
    });
  }

  ngOnInit(): void {
  }

}
