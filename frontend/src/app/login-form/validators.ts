// Check if email already taken
import {LoginService} from "./login.service";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export function emailExistsValidator(service: LoginService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return service.emailExists(control.value).pipe(map(res =>
      res ? null : {'err_email_not_exists': true}
    ));
  }
}
