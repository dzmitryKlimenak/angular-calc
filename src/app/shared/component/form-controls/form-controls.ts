import { checkEmailValidityFn } from '../../util';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormValidators {
  static emailValidation(control: AbstractControl): ValidationErrors | null {
    return checkEmailValidityFn(control.value) ? null : { email: true };
  }
}
