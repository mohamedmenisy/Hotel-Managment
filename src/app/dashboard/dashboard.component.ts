import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SideNavService } from '../shared/Services/side-nav.service';
import { LoaderComponent } from '../shared/loader/loader.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,RouterOutlet,LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
SideBarOpened:boolean=false;
screenWidth=0;
constructor(private _SideNavService:SideNavService) {}
ngOnInit(): void {
  this._SideNavService.isOpened$.subscribe((value) => {this.SideBarOpened=value;}); // listen if any change
  this._SideNavService.screenWidth$.subscribe((value)=>{this.screenWidth=value;}) // listen if any change
}
toggleSidebar() {
  const current = this._SideNavService.getIsOpened();
  this._SideNavService.setIsOpened(!current);
}
GetBodyClass():string{
  let styleClass='';
  if (this.SideBarOpened && this.screenWidth > 768) {
    styleClass='body-trimmed';
  }else if(this.SideBarOpened && this.screenWidth <= 768 && this.screenWidth > 0){
  styleClass='body-md-screen';
  }
  return styleClass;
}
}
