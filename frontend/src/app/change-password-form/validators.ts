import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

/**
 * Factory method for creating a validator that checks if the `confirm_password` feild matches with `new_password`
 * 
 * @returns {ValidatorFn} Function for determining if the `new_password` and `confirm_password` fields match
 */
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('new_password'),
      confirm_password = control.get('confirm_password');

    if (password.touched || confirm_password.touched) {
      return password.value === confirm_password.value ? null : {'err_mismatch': true};
    }
  }
}
