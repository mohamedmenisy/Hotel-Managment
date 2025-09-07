import { Iregister } from './../../Interfaces/iregister';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {ReactiveFormsModule,FormGroup,FormControl,Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatSelectModule} from '@angular/material/select';
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
    NgxDropzoneModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private auth: AuthService, private s: MatSnackBar, private r: Router) {}

  hideNewPassword = true;
  hideConfirmPassword = true;
  files: File[] = [];
  imgSrc:any=null;
  PasswordPattern:RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/;
  passwordError:string="Password must contain uppercase, lowercase, number, symbol (max 10 chars)"
   passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newpassword = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newpassword === confirmPassword ? null : { passwordMismatch: true };
  }

  bookingForm:FormGroup = new FormGroup(
    {
      userName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl<number | null>(null, [Validators.required, Validators.min(10)]),
      country: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.PasswordPattern)]),
      confirmPassword: new FormControl(null, [Validators.required,Validators.pattern(this.PasswordPattern)]),
      role: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null,[Validators.required]),
    },
    { validators: this.passwordMatchValidator });

  onSubmit(from:FormGroup) {


      let myData = new FormData();
    //append data to formData
    Object.keys(from.controls).forEach(key => {
      const value = from.get(key)?.value;
      if (value !== null && value !== undefined) {
        myData.append(key, value);
      }
    });
      //append profileImg
      myData.append('profileImage',this.imgSrc);

      this.auth.onRegister(myData).subscribe({
        next: (response) => {

          this.s.open('You Can Now Join Us', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
        },
        error: (error) => {
          this.s.open('An error occurred', '', {
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

  }


onSelect(event:any) {
    this.files = [event.addedFiles[0]];
    this.imgSrc=this.files[0]
}

onRemove(event:any) {
 this.files = [];
 this.imgSrc=null;
}
}
