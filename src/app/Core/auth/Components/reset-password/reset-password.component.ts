import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IresetPassword } from '../../Interfaces/ireset-password';
import { AlertsService } from '../../../../shared/Services/alerts.service';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {


  constructor(private auth: AuthService, private _alert: AlertsService, private r: Router) { }
  hideNewPassword = true;
  hideConfirmPassword = true;
  PasswordPattern:RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/;
  passwordError:string="Password must contain uppercase, lowercase, number, symbol (max 10 chars)"
  private Data: IresetPassword[] = [];

  passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const newpassword = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return newpassword === confirmPassword ? null : { passwordMismatch: true };
};
  resetForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    seed: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password:new FormControl(null,[Validators.required,Validators.pattern(this.PasswordPattern)]),
    confirmPassword: new FormControl(null, [Validators.required,Validators.pattern(this.PasswordPattern)])
  },{ validators: this.passwordMatchValidator});




  onSubmit() {
  if (this.resetForm.valid) {
        const formValue: IresetPassword = this.resetForm.value as IresetPassword;
        console.log('Form Data:', formValue);

        this.auth.onReset(formValue).subscribe({
          next: (response) => {
            console.log('API Success Response:', response);
            this._alert.succeess('You Can Login With The Updated Password')
            this.Data.push(response);
          },
          error: (error) => {
            this._alert.Error();
          },

          complete: () => { this.r.navigateByUrl("/auth/login") },
        });
      } else {
        this.resetForm.markAllAsTouched();
      }
    }
  }
