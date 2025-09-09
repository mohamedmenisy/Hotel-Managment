import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashLoaderService } from '../Services/dash-loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dash-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-loader.component.html',
  styleUrls: ['./dash-loader.component.scss'] 
})
export class DashLoaderComponent {
  isLoading$: Observable<boolean>;

  constructor(private loader: DashLoaderService) {
    this.isLoading$ = this.loader.loading$; 
  }
}
