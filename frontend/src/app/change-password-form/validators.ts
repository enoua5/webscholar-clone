import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

//Check if passwords match
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('new_password'),
      confirm_password = control.get('confirm_password');

    if (password.touched || confirm_password.touched) {
      return password.value === confirm_password.value ? null : {'err_mismatch': true};
    }
  }
}
