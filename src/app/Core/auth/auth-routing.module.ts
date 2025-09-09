import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Sign-Up' },
      { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset-Password' },
      { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Forgot-Password' },
      { path: 'change-password', component: ChangePasswordComponent, title: 'Change-Password' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
