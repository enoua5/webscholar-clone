import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

// Component Metadata
@Component({
  selector: 'request-role-form',
  templateUrl: './request-role-form.component.html',
  styleUrls: ['./request-role-form.component.less']
})

export class RequestRoleFormComponent implements OnInit 
{
  // Component Attributes
  pageTitle: string = "Request Role";
  roles: string[] = ['Committee Member', 'Committee Chair'];
  roleForm = new FormGroup({
    roleControl: new FormControl('', [Validators.required])
  });

  // Default constructor
  constructor() {}

  // Component Methods
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
    console.log(this.roleForm)
  }

  private processResponse(data)
  {
    // TODO
  }

}
