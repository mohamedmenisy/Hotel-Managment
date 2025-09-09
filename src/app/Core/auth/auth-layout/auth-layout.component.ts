import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLoaderComponent } from '../../../shared/auth-loader/auth-loader.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, AuthLoaderComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
