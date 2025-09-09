import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLoaderComponent } from './shared/auth-loader/auth-loader.component';
import { DashLoaderComponent } from "./shared/dash-loader/dash-loader.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthLoaderComponent, DashLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hotel';
}
