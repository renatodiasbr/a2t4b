import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }

    return null;
  }

  static dontMatchOldPassword(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise<ValidationErrors | null>((resolve, reject) => {
      setTimeout(() => {
        if (control.value !== 'renato') {
          return resolve({ dontMatchOldPassword: true });
        } else {
          return resolve(null);
        }
      }, 2000);
    });
  }

  static newPasswordMustBeDifferentFromOld(oldPasswordPath: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const oldPassWord = control.root.get(oldPasswordPath);

      if (oldPassWord != null) {
        return control.value === oldPassWord.value ? { newPasswordMustBeDifferentFromOld: true } : null;
      }

      return null;
    };
  }

  static confirmPasswordDoesNotMach(newPasswordPath): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPassWord = control.root.get(newPasswordPath);

      if (newPassWord != null) {
        return control.value !== newPassWord.value ? { confirmPasswordDoesNotMach: true } : null;
      }

      return null;
    };
  }
}
