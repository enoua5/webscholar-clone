import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PendingRoleRequestsService } from './pending-role-requests.service';

// Component Metadata
@Component({
    selector: 'pending-role-requests',
    templateUrl: './pending-role-requests.component.html'
})

export class PendingRoleRequestsComponent implements OnInit
{
    // Component Attributes
    pageTitle: string = "Role Requests";
    requestList: {id: number,
                  first_name: string,
                  last_name: string,
                  e_mail: string,
                  role: string,
                 }[];
    requestForm = new FormGroup({});

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

    onSubmit(): void
    {
        // TODO: Submit fake API call to backend.
        console.log(this.requestForm)
    }
}