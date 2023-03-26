import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { requireSelectionValidator } from './pending-role-requests-validators';
import { PendingRoleRequestsService } from './pending-role-requests.service';

// Declare our RequestList type so we don't have to copy it over and over.
type Request = 
{
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role: string,
};
type RequestList = Request[];

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
    requestList: RequestList;
    requestForm = new FormGroup({}, requireSelectionValidator());
    errorList: string[];

    // Constructor
    constructor(private service: PendingRoleRequestsService) {}

    /**
     * Queries the backend for all of the current role requests and then populates
     * our FormGroup with the appropriate number of controls.
     */
    private populateRequestTable(): void
    {
        this.requestList = this.service.getRequests();

        // Clears the form each time on load. Prevents duplicate rows.
        Object.keys(this.requestForm.controls).forEach((control) => {
            this.requestForm.removeControl(control);
        });

        this.requestList.forEach((request) => {
            this.requestForm.addControl("" + request.id, new FormControl())
        });
    }

    /**
     * Populates our page with all of the current role requests on load.
     */
    ngOnInit(): void 
    {
        this.populateRequestTable();
    }

    /**
     * Parses the submitted form and pulls out all of the request IDs for the selected requests.
     * 
     * @returns A RequestList containing the selected requests.
     */
    private getSelectedRequests(): RequestList
    {
        let selectedRequests: RequestList = [];

        Object.keys(this.requestForm.controls).forEach((controlName) => {
            const control = this.requestForm.controls[controlName];

            if (control.value == true)
            {
                let matchingRequest = this.requestList.find(request => "" + request['id'] === controlName);
                selectedRequests.push(matchingRequest);
            }
        });

        return selectedRequests;
    }

    /**
     * Called when the user clicks "approve" after having selected at least one request.
     */
    async onSubmit(): Promise<void>
    {
        this.errorList = null;

        let selectedRequests: RequestList = this.getSelectedRequests();
        await this.service.approveRequests(selectedRequests).then((errorList) => 
        {
            this.errorList = errorList;
        });

        this.populateRequestTable();
    }

    /**
     * Called when the user clicks "deny" after having selected at least one request.
     */
    async denyRequests(): Promise<void>
    {
        this.errorList = null;

        let selectedRequests: RequestList = this.getSelectedRequests();
        await this.service.denyRequests(selectedRequests).then((errorList) => 
        {
            this.errorList = errorList;
        });

        this.populateRequestTable();
    }
}