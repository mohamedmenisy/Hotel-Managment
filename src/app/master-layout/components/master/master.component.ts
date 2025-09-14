import { Component } from '@angular/core';
import { NavbarHomeComponent } from '../navbar-home/navbar-home.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [NavbarHomeComponent,RouterOutlet,FooterComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent {

}
