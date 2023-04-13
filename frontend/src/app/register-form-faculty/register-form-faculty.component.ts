import { Component, OnInit } from '@angular/core';

/** This class manages the data and functionality of the faculty registration form */
@Component({
    selector: 'app-register-form-faculty',
    templateUrl: './register-form-faculty.component.html',
    styleUrls: ['./register-form-faculty.component.less']
})
export class RegisterFormFacultyComponent implements OnInit {
    /**
     * Stub.
     *
     * @todo Should set up the form.
     */
    constructor() {}

    /**
     * Stub.
     *
     * Called on page load. Used by Angular, but isn't really needed for our purposes.
     */
    ngOnInit(): void {}

    /**
     * Called on form submission.
     *
     * Gathers and checks the validity of the form data before sending it to the backend to be saved
     *
     * Not currently implemented
     *
     * @todo Implement
     */
    onRegister(): void {
        alert('button pressed');
    }
}
