import {AbstractControl, FormGroup} from '@angular/forms';

export class PasswordValidator {

  static newIsNotOld(group: FormGroup): any {
    const newPwd = group.controls['newPwd'];
    if (group.controls['oldPwd'].value === newPwd.value) {
      newPwd.setErrors({ 'newIsNotOld': true });
    }
    return null;
  }

  static matchPwds(control: AbstractControl) {
    const newPwd2 = control.get('newPwd');
    const confirmPwd2 = control.get('confirmPwd');
    if (newPwd2.value !== confirmPwd2.value) {
      return { pwdsDontMatch: true };
    }
    return null;
  }
}
