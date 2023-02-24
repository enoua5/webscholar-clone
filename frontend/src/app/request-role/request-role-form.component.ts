import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgModel, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-request-role-form',
  templateUrl: './request-role-form.component.html',
  styleUrls: ['./request-role-form.component.less']
})

export class RequestRoleFormComponent implements OnInit 
{
  form: FormGroup;
  error: string = null;
  errors: Map<string, string> = new Map();
  role_select = new FormControl('');
  roles: string[] = ['Committee Member', 'Committee Chair']

  ngOnInit(): void 
  {
    // TODO
  }

  private checkErrors(): void 
  {
    // TODO
  }

  onSubmit(): void
  {
    // TODO
  }

  private processResponse(data)
  {
    // TODO
  }

}
