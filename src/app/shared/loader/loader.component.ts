import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LoaderService } from './../Services/loader.service';



@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
isLoading$: Observable<boolean>;

  constructor(private loader: LoaderService) {
    this.isLoading$ = this.loader.loading$;
  }
}
