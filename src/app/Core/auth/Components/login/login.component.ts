import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,
    MatIconModule,
    MatButtonModule,
  ReactiveFormsModule,
// HttpClientModule,
MatInputModule,
MatFormFieldModule,
CommonModule,
NgIf
],
 providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

 
 hide = true;
 constructor(private _AuthService:AuthService){}
  matcher = new ErrorStateMatcher();
  value = 'Clear me';
  lohin(data:FormGroup){
this._AuthService.login(data.value).subscribe({
  next:(res)=>{
console.log(res);
localStorage.setItem('token',res.Token);
  }
})
  }
  
   loginForm = new FormGroup({
     email: new FormControl(null, [Validators.required, Validators.email]),
     password: new FormControl(null, [
       Validators.required,
       Validators.maxLength(20),
       Validators.minLength(3),
     ]),
   });


}
