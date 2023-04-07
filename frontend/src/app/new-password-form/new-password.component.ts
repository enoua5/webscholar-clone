import { Component } from '@angular/core';

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password-form.component.html'
})
export class NewPasswordComponent {
    pageTitle: string = 'New Password Form';

    onFPassword(): void {
        alert('Password has been updated');
    }
}
