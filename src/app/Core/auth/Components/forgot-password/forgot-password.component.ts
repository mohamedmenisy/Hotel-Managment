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
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertsService } from '../../../../shared/Services/alerts.service';


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

  constructor(private auth: AuthService, private _alert: AlertsService, private r: Router) { }

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
          this._alert.succeess('Check Your Inbox For The Verification Code')
          this.Data.push(response);
        },
        error: (error) => {
          this._alert.Error()
        },

        complete: () => { this.r.navigateByUrl("/auth/reset-password") },
      });
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
