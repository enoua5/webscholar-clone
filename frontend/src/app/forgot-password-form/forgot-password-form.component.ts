import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-forgot-password-form',
    templateUrl: './forgot-password-form.component.html',
    styleUrls: ['./forgot-password-form.component.less']
})
export class ForgotPasswordFormComponent implements OnInit {
    form: FormGroup;
    error: string;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            email: ['']
        });

        this.error = '';
    }

    ngOnInit(): void {}

    private checkErrors(): void {
        this.error = '';

        //Email verification
        const validEmail = RegExp(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
        );
        if (this.form.get('email').value.length == 0) {
            this.error = 'Email required, please enter a valid email';
        } else if (!validEmail.test(this.form.get('email').value)) {
            this.error = 'Email invalid, please enter a valid email';
        }
    }

    onSubmit(): void {
        this.checkErrors();

        // TODO: connect to backend
        // TEMPORARY CODE
        if (this.error == '') {
            alert('no errors detected');
        } else {
            alert('errors detected');
        }
    }
}
