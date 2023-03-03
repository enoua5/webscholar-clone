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
    requestForm = new FormGroup({
        requestControl: new FormControl('')
    });

    // Constructor
    constructor(private service: PendingRoleRequestsService) {}

    // Component Methods
    ngOnInit(): void 
    {
        // TODO: Populate requests list with random data from service.
        this.requestList = this.service.getRequests();
    }

    onSubmit(): void
    {
        // TODO: Submit fake API call to backend.
    }
}