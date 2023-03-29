import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RequestRoleService } from './request-role.service';

/**
 * Metadata for the RequestRoleFormComponent.
 */
@Component({
  selector: 'request-role-form',
  templateUrl: './request-role-form.component.html'
})

/**
 * Defines the RequestRoleFormComponent class.
 * 
 * @details This component allows users to request a new role.
 */
export class RequestRoleFormComponent 
{
  /**
   * The title to display on the page tied to this component.
   */
  pageTitle: string = "Request Role";

  /**
   * A list of the possible roles that users can apply for.
   */
  roles: string[] = ['Committee Member', 'Committee Chair'];

  /**
   * The dropdown menu that is displayed to the user.
   */
  roleForm = new FormGroup({
    roleControl: new FormControl('Committee Member', [Validators.required])
  });

  /**
   * This variable stores any errors generated during processing.
   */
  errorMessage: string = null;

  /**
   * This variable indicates when a request was successfully received by the backend.
   */
  success: boolean = false;

  /**
   * Constructor for the RequestRoleFormComponent.
   * 
   * @param service The RequestRoleService object to use for this component.
   */
  constructor(private service: RequestRoleService) {}

  /**
   * Called when the user submits the form. Sends their role request to the backend.
   */
  onSubmit(): void
  {
    // Clear error message & success in case different results are generated each time.
    this.errorMessage = null;
    this.success = false;

    const selectedRole: string = this.roleForm.controls['roleControl'].value;
    this.service.sendRequest(selectedRole).subscribe(
      {
        next: () => this.success = true,
        error: (error) => this.processErrors(error)
      });
  }

  /**
   * Parses the response from the backend to determine what errors need to be displayed.
   * 
   * @param response The HTTPErrorResponse given to us from the request_role endpoint.
   */
  private processErrors(response)
  {
    if (response.status != 200)
    {
      this.errorMessage = response.error.message;
    }
  }
}
