import { Iregister } from './../../Interfaces/iregister';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,FormGroup,FormControl,
  Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private auth: AuthService, private s: MatSnackBar, private r: Router) {}

  hideNewPassword = true;
  hideConfirmPassword = true;

  private Data: Iregister[] = [];

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  bookingForm = new FormGroup(
    {
      userName: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl<number | null>(null, [Validators.required, Validators.min(10)]),
      country: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl<string>('', [Validators.required]),
      role: new FormControl<string>('user', [Validators.required]),
      profileImage: new FormControl(''),
    },
    { validators: this.passwordMatchValidator }
  );

  onSubmit() {

    if (this.bookingForm.valid) {
      const formValue: Iregister = this.bookingForm.value as Iregister;

      this.auth.Book(formValue).subscribe({
        next: (response) => {
          console.log('API Success Response:', response);
          this.s.open('You Can Now Join Us', 'Account Created', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.Data.push(response);
        },
        error: (error) => {
          console.error('API Error:', error);
          this.s.open('An error occurred', 'Oops', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
        complete: () => {
          this.r.navigateByUrl('/auth/login');
        },
      });
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
