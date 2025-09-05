import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../Services/auth.service';
import { IforgotPassword } from '../../Interfaces/iforgot-password';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private auth: AuthService, private s: MatSnackBar, private r: Router) { }

  hideEmail = true;

  forgotForm = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.email])
  });

  private Data: IforgotPassword[] = [];

  onSubmit() {
    if (this.forgotForm.valid) {
      const formValue: IforgotPassword = this.forgotForm.value as IforgotPassword;
      console.log('Form Data:', formValue);

      this.auth.onForget(formValue).subscribe({
        next: (response) => {
          console.log('API Success Response:', response);
          this.s.open('Check Your Inbox For The Verification Code', "Email Sent", {
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

        complete: () => { this.r.navigateByUrl("/auth/reset-password") },
      });
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
