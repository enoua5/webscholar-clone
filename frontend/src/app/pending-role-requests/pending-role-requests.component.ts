import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

// Component Metadata
@Component({
    selector: 'pending-role-requests',
    templateUrl: './pending-role-requests.component.html'
})

export class PendingRoleRequestsComponent implements OnInit
{
    // Component Attributes
    pageTitle: string = "Role Requests";
    requestForm = new FormGroup({
        requestControl: new FormControl('')
    });

    // Constructor
    constructor() {}

    // Component Methods
    ngOnInit(): void 
    {
        // TODO: Populate requests list with random data from service.
    }

    onSubmit(): void
    {
        // TODO: Submit fake API call to backend.
    }
}