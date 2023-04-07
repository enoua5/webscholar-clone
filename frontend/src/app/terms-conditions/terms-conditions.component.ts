import { Component, OnInit } from '@angular/core';
import { TermsConditionsService } from './terms-conditions.service';

/**
 * Terms Conditions Component
 */
@Component({
    selector: 'terms-conditions',
    templateUrl: './terms-conditions.component.html',
    styleUrls: ['./terms-conditions.component.less']
})

/**
 * Interacts with the invitation form on the page
 */
export class TermsConditionsComponent implements OnInit {
    /**
     * Empty constructor (Nothing on a page to interact with)
     * @param service TermsConditionsService dependency
     */
    constructor(private service: TermsConditionsService) {}

    /**
     * Runs when page is loaded, makes an API call
     */
    ngOnInit(): void {
        // TODO: This should send a request to the backend service that would provide
        // terms and conditions data, instead of having it hard-coded as it is nows
        this.service.retrieve().subscribe((data) => this.processResponse(data));
    }

    /**
     * Runs when the response is received from the backend
     * TODO: Has to populate the info on the page with data returned from backend
     * @param data data received from backend
     */
    private processResponse(data) {
        // TODO: backend should send us back the requested data
        console.log(data);
    }
}
