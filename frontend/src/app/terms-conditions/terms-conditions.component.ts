import {Component, OnInit} from '@angular/core';
import {TermsConditionsService} from './terms-conditions.service';

@Component({
    selector: 'terms-conditions',
    templateUrl: './terms-conditions.component.html',
    styleUrls: ['./terms-conditions.component.less']
})

export class TermsConditionsComponent implements OnInit {
    // Declares a service
    constructor(private service: TermsConditionsService) {}

    ngOnInit(): void {
        // TODO: This should send a request to the backend service that would provide
        // terms and conditions data, instead of having it hard-coded as it is nows
        this.service.retrieve().subscribe((data) => this.processResponse(data));  
    }

    private processResponse(data)
    {
        // TODO: backend should send us back the requested data
        console.log(data);
    }
}