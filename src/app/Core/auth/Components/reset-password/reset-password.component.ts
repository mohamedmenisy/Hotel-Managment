import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IresetPassword } from '../../Interfaces/ireset-password';
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


  constructor(private auth: AuthService, private s: MatSnackBar, private r: Router) { }

  hideEmail = true;
  hideOtp = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  private Data: IresetPassword[] = [];

  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    otp: new FormControl('', [Validators.required, Validators.minLength(4)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  onSubmit() {
  if (this.resetForm.valid) {
        const formValue: IresetPassword = this.resetForm.value as IresetPassword;
        console.log('Form Data:', formValue);

        this.auth.onReset(formValue).subscribe({
          next: (response) => {
            console.log('API Success Response:', response);
            this.s.open('You Can Login With The Updated Password', "Password Reset", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['success-snackbar']
            });
            this.Data.push(response);
          },
          error: (error) => {
            console.error('API Error:', error);
            this.s.open("an error occurred", "Oops",
              {
                duration: 3000,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: ['error-snackbar']
              }
            );
          },

          complete: () => { this.r.navigateByUrl("/auth/login") },
        });
      } else {
        this.resetForm.markAllAsTouched();
      }
    }
  }
