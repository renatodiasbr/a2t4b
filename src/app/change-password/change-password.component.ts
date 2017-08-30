import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      oldPassword: ['',
        [
          Validators.required,
          Validators.minLength(6),
          PasswordValidators.cannotContainSpace
        ],
        PasswordValidators.dontMatchOldPassword
      ],
      newPassword: ['',
        [
          Validators.required,
          Validators.minLength(6),
          PasswordValidators.cannotContainSpace,
          PasswordValidators.newPasswordMustBeDifferentFromOld('oldPassword')
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
          Validators.minLength(6),
          PasswordValidators.cannotContainSpace,
          PasswordValidators.confirmPasswordDoesNotMach('newPassword')
        ]
      ]
    });

    this.newPassword.valueChanges.subscribe(() => {
      this.confirmPassword.updateValueAndValidity();
    });
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
