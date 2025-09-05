import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule,MatButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  PasswordPattent:RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/;
  passwordError:string="Password must contain uppercase, lowercase, number, symbol (max 10 chars)"
  hide = true;
  hidenewPass = true;
  hideCofirmPass = true;
  changePasswordForm:FormGroup = new FormGroup({
    oldPassword:new FormControl(null,[Validators.required,Validators.pattern(this.PasswordPattent)]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(this.PasswordPattent)]),
    confirmPassword:new FormControl(null,[Validators.required,Validators.pattern(this.PasswordPattent)]),
  },{ validators: this.passwordMatchValidator});

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newpassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newpassword === confirmPassword ? null : { passwordMismatch: true };
  }

  ChangePassowrd(changePasswordForm:FormGroup){
    if(changePasswordForm.invalid)
      return changePasswordForm.errors
    return;
  }

}
