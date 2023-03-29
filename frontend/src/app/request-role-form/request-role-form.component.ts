import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RequestRoleService } from './request-role.service';

// Component Metadata
@Component({
  selector: 'request-role-form',
  templateUrl: './request-role-form.component.html'
})

export class RequestRoleFormComponent implements OnInit 
{
  // Component Attributes
  pageTitle: string = "Request Role";
  roles: string[] = ['Committee Member', 'Committee Chair'];
  roleForm = new FormGroup({
    roleControl: new FormControl('Committee Member', [Validators.required])
  });

  // Default constructor
  constructor(private service: RequestRoleService) {}

  // Component Methods
  ngOnInit(): void 
  {
    // TODO: get currently logged-in user's email to send to backend with request.
  }

  onSubmit(): void
  {
    this.service.sendRequest(this.roleForm.value).subscribe((data) => this.processResponse(data));
  }

  private processResponse(data)
  {
    // TODO: backend should report if the user already has an existing request.
    console.log(data);
  }
}
