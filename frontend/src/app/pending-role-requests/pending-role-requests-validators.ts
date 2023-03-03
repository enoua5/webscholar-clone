import { FormGroup, ValidatorFn } from "@angular/forms";
import {Observable} from "rxjs";

/**
 * Verifies that the user has selected at least one item in the list before submitting the form.
 * @returns An "noRequestsSelected" error if no requests were selected; null otherwise.
 */
export function requireSelectionValidator(): ValidatorFn 
{
  return function validate (formGroup: FormGroup)
  {
    let selected: number = 0;

    Object.keys(formGroup.controls).forEach((controlName) => {
        const control = formGroup.controls[controlName];

        if (control.value == true)
        {
            selected++;
        }
    });

    if (selected == 0)
    {
        return { noRequestsSelected: true };
    }
    
    return null;
  };
}
