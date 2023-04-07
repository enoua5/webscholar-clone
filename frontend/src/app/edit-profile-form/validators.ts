import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditProfileService } from './edit-profile.service';

/**
 * Validates that an email has not already been taken, for the purpose of editing user profile
 * @param service
 */
export function emailExistsValidator(
    service: EditProfileService
): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
        // if email in session storage is same as email to check, will return false because that value is definitely taken
        if (control.value == sessionStorage.getItem('email')) {
            return service
                .emailExists(control.value)
                .pipe(map((res) => (res ? { err_email_taken: false } : null)));
        }
        return service
            .emailExists(control.value)
            .pipe(map((res) => (res ? { err_email_taken: true } : null)));
    };
}
