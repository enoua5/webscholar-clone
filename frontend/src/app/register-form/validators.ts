import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {RegisterService} from "./register.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

//Check if passwords match
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password'),
      confirm_password = control.get('confirm_password');

    if (password.touched || confirm_password.touched) {
      return password.value === confirm_password.value ? null : {'err_mismatch': true};
    }
  }
}

// Check if email already taken
export function emailTakenValidator(service: RegisterService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return service.emailTaken(control.value).pipe(map(res =>
      res ? {'err_email_taken': true} : null
    ));
  }
}
