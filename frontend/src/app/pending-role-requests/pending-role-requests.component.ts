import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { requireSelectionValidator } from './pending-role-requests-validators';
import { PendingRoleRequestsService } from './pending-role-requests.service';

// Component Metadata
@Component({
    selector: 'pending-role-requests',
    templateUrl: './pending-role-requests.component.html',
    styleUrls: ['./pending-role-requests.component.less']
})

export class PendingRoleRequestsComponent implements OnInit
{
    // Component Attributes
    pageTitle: string = "Role Requests";
    requestList: {id: number,
                  first_name: string,
                  last_name: string,
                  email: string,
                  role: string,
                 }[];
    requestForm = new FormGroup({}, requireSelectionValidator());

    // Constructor
    constructor(private service: PendingRoleRequestsService) {}

    // Component Methods
    ngOnInit(): void 
    {
        // Query the backend for a list of all of the requests, then
        // dynamically populate the form according to how many requests
        // there are.
        this.requestList = this.service.getRequests();
        this.requestList.forEach((request) => {
            this.requestForm.addControl("" + request.id, new FormControl())
        });
    }

    /**
     * Called when the user clicks "approve" after having selected at least one request.
     */
    onSubmit(): void
    {
        // TODO: Submit fake API call to backend.
        console.log(this.requestForm)
        let selectedRequests: number[] = this.getSelectedRequests();
        this.service.approveRequests(selectedRequests);
    }

    /**
     * Parses the submitted form and pulls out all of the request IDs for the selected requests.
     * 
     * @returns A list of all of the selected requests' IDs.
     */
    private getSelectedRequests(): number[]
    {
        let requestIDList: number[] = [];

        Object.keys(this.requestForm.controls).forEach((controlName) => {
            const control = this.requestForm.controls[controlName];

            if (control.value == true)
            {
                requestIDList.push(+controlName);
            }
        });

        return requestIDList;
    }

    /**
     * Called when the user clicks "deny" after having selected at least one request.
     */
    denyRequests(): void
    {
        console.log(this.requestForm)
        let selectedRequests: number[] = this.getSelectedRequests();
        this.service.denyRequests(selectedRequests);
    }
}