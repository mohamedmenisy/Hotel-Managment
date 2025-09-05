import { Component } from '@angular/core';
import {FormControl,Validators,FormsModule, ReactiveFormsModule,FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,MatIconModule,MatButtonModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,CommonModule,NgIf
],
 providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(private _AuthService:AuthService){}
  PasswordPattent:RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,10}$/;
  passwordError:string="Password must contain uppercase, lowercase, number, symbol (max 10 chars)"
 hide = true;
  matcher = new ErrorStateMatcher();
  value = 'Clear me';
  login(data:FormGroup){
    this._AuthService.login(data.value).subscribe({
      next:(res)=>{
    console.log(res);
    localStorage.setItem('token',res.Token);
      }
    });
  }

   loginForm = new FormGroup({
     email: new FormControl(null, [Validators.required, Validators.email]),
     password: new FormControl(null, [
       Validators.required,Validators.pattern(this.PasswordPattent)
     ]),
   });


}
