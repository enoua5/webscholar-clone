import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { requireSelectionValidator } from './pending-role-requests-validators';
import { PendingRoleRequestsService } from './pending-role-requests.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


/**
 * Declare our RequestList type so we don't have to copy it over and over.
 */
type Request = 
{
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role: string,
};

/**
 * Just a list of our requests to send.
 */
type RequestList = Request[];

/**
 * Component metadata
 */
@Component({
    selector: 'pending-role-requests',
    templateUrl: './pending-role-requests.component.html',
    styleUrls: ['./pending-role-requests.component.less'],
    animations: [
      /**
       * Each unique animation requires its own trigger.
       */ 
      trigger('rotatedState', [
        state('default', style({ transform: 'rotate(0deg)' })),
        state('rotated', style({ transform: 'rotate(180deg)' })),
        transition('rotated <=> default', animate('300ms ease-in')),
      ])
    ]
})

/**
 * A component of a page.
 */
export class PendingRoleRequestsComponent implements OnInit
{
    /**
     * Title 
     */
    pageTitle: string = "Role Requests";

    /**
     * List of requests to send
     */
    requestList: RequestList;

    /**
     * Form on a page
     */
    requestForm = new FormGroup({}, requireSelectionValidator());

    /**
     * List of errors
     */
    errorList: string[];

    /**
     * Used for an animation.
     * An array of states for each of the columns.
     */
    states: string[] = ['default','default','default','default'];

    /**
     * A string used to search and filter the table
     */
    searchText: string = "";
    /**
     * A helper function for an animation.
     * @param n a number for a column. Starts with 1, so has to be decremented.
     */
    rotate(n): void {
        n=n-1
        this.states[n] = (this.states[n] === 'default' ? 'rotated' : 'default');
    }

    /**
     * Empty constructor 
     * @param service in the service.ts file
     */
    constructor(private service: PendingRoleRequestsService) {}

    /**
     * Function used for sorting table by column
     * @param n column number to sort by. Starts at 1
     */
    sortData(n): void {
      var table, rows, switching, i, x, y, shouldSwitch, dir;
      table = document.getElementById("myTable");
      switching = true;

      // Loops over all the columns and resets their style
      for(i = 1; i <= 4; i++)
      {
        if(i!=n)
        {
          // Rotate all the arrows back into original position
          if(this.states[i-1] == 'rotated')
          {
            this.rotate(i)
          } 
          document.getElementById("col" + i).style.color = "#cccccc";
        }
      }

      // Set the sorting direction to ascending or descending
      // based on the value of the arrow
      if(this.states[n-1] === 'default')
      {
        dir = "asc";
      }
      else
      {
        dir = "desc";
      }

      document.getElementById("col" + n).style.color = "#000000"

      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare,
          one from current row and one from the next: */
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];

          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
        }
      }
    }

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