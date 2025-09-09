import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../shared/Services/alerts.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatSnackBarModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  PasswordPattern:RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/;
  passwordError:string="Password must contain uppercase, lowercase, number, symbol (max 10 chars)"
  hide = true;
  hidenewPass = true;
  hideCofirmPass = true;
  constructor(private _auth:AuthService,private _alert:AlertsService,private _router:Router){}
  changePasswordForm:FormGroup = new FormGroup({
    oldPassword:new FormControl(null,[Validators.required,Validators.pattern(this.PasswordPattern)]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(this.PasswordPattern)]),
    confirmPassword:new FormControl(null,[Validators.required,Validators.pattern(this.PasswordPattern)]),
  },{ validators: this.passwordMatchValidator});

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newpassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newpassword === confirmPassword ? null : { passwordMismatch: true };
  }

  ChangePassowrd(changePasswordForm:FormGroup){
    this._auth.ChangePassword(changePasswordForm.value).subscribe({
      next:(res)=>{
          this._alert.succeess("Your password has been changed")
      },
      error:(err)=>{
        console.log(err);
        
      this._alert.Error()
      },
      complete:()=>{
      this._router.navigate(["/dashboard"])
      },
    })
  }
  back(){
    this._router.navigate(["/dashboard"])
  }
}
