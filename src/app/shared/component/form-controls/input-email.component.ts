import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidators } from './form-controls';

@Component({
  selector: 'app-form-controls',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss'],
})
export class InputEmailComponent {
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      email: this.fb.control('', [FormValidators.emailValidation]),
    });
  }
}
