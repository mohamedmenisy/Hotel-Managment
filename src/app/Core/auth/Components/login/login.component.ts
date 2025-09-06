import { Component } from '@angular/core';
import {FormControl,Validators,FormsModule, ReactiveFormsModule,FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSnackBarModule, FormsModule,MatIconModule,MatButtonModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,RouterLink
],
 providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(private _AuthService:AuthService,private _snackBar:MatSnackBar){}
  PasswordPattent:RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/;
  passwordError:string="Password must contain uppercase, lowercase, number, symbol (max 10 chars)"
   hide = true;


   loginForm = new FormGroup({
     email: new FormControl(null, [Validators.required, Validators.email]),
     password: new FormControl(null, [
       Validators.required,Validators.pattern(this.PasswordPattent)
     ]),
   });
  login(data:FormGroup){
    this._AuthService.login(data.value).subscribe({
      next:(res)=>{
      localStorage.setItem('token',res.Token);
       this._snackBar.open('Your password has been changed successfully 🎉',"", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['success-snackbar']
        });
      },
      error:(err)=>{
         this._snackBar.open("an error occurred","",
                {
                  duration: 3000,
                  horizontalPosition: "end",
                  verticalPosition: "top",
                  panelClass: ['error-snackbar']
                }
        );
      }
    });
  }

}
