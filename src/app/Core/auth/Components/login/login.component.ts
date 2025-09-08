import { Component } from '@angular/core';
import {FormControl,Validators,FormsModule, ReactiveFormsModule,FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
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
  constructor(private _AuthService:AuthService,private _snackBar:MatSnackBar,private _router:Router){}
  PasswordPattent:RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/;
  passwordError:string="Password must contain uppercase, lowercase, number, symbol (max 10 chars)"
   hide = true;


   loginForm = new FormGroup({
     email: new FormControl(null, [Validators.required, Validators.email]),
     password: new FormControl(null, [
       Validators.required,
     ]),
   });
  login(data:FormGroup){
    this._AuthService.login(data.value).subscribe({
      next:(res)=>{
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('role',res.data.user.role);
      localStorage.setItem('userName',res.data.user.userName);
      localStorage.setItem('id',res.data.user._id);
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
      },
      complete:()=>{

        if(localStorage.getItem('role') == 'admin'){

        this.getCurrentUser(localStorage.getItem("id"));

        }
      }
    });
  }


    getCurrentUser(userid:any){
    this._AuthService.getCurrentUser(userid).subscribe({
      next:(res)=>{
          localStorage.setItem('profileImage', res.data.user.profileImage);
          this._router.navigate(['/dashboard']);
        this._snackBar.open('Login successfully 🎉',"", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['success-snackbar']
        });
      },

    })
  }

}
