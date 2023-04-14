import {
    AbstractControl,
    AsyncValidatorFn,
    FormGroup,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';
import { RegisterService } from './register.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Validates the equality of a control's password field and confirm_password field
 * Created to be used by the passwordFields field in {@link RegisterFormComponent}
 */
export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let password = control.get('password'),
            confirm_password = control.get('confirm_password');

        if (password.touched || confirm_password.touched) {
            return password.value === confirm_password.value
                ? null
                : { err_mismatch: true };
        }
    };
}

/**
 * Validates the existence of an email by calling the {@link LoginService#emailExists} function inside the Login
 * Service.
 * @param service Login Service
 */
export function emailExistsValidator(
    service: RegisterService
): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
        return service
            .emailExists(control.value)
            .pipe(map((res) => (res ? { err_email_taken: true } : null)));
    };
}
