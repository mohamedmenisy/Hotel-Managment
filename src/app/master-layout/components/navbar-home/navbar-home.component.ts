import { AuthService } from './../../../Core/auth/Services/auth.service';
import { Component, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { AdsRoutingModule } from "../../../Modules/ads/ads-routing.module";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/Services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../../shared/profile/profile.component';

@Component({
  selector: 'app-navbar-home',
  standalone: true,
  imports: [AdsRoutingModule,RouterLink,RouterLinkActive,MatIconModule,MatMenuModule,MatButtonModule,TranslatePipe,MatButtonModule],
  templateUrl: './navbar-home.component.html',
  styleUrl: './navbar-home.component.scss',
})
export class NavbarHomeComponent {
  constructor(private langService: LanguageService,private _auth: AuthService,public dialog: MatDialog) {}

@ViewChild ("dorpdown") dropdown!:ElementRef;
isMobileSize:boolean=false;
userImg:any;
userName:string | null=null;
token:string |null=null;
ngOnInit(): void {
  this.token=localStorage.getItem('token');
}
@HostListener('window:resize', ['$event'])
  onResize() {
    const dropdownEl = this.dropdown.nativeElement;
    if(window.innerWidth > 768){
      dropdownEl.style.display = 'block';
    }else{
      dropdownEl.style.display = 'none';
    }
  }
ShowNav(){
  const dropdownEl = this.dropdown.nativeElement;
    if (dropdownEl.style.display === 'block') {
      dropdownEl.style.display = 'none';
    } else {
      dropdownEl.style.display = 'block';
    }
}
setLanguage(lang:string) {
  this.langService.setLang(lang);
}
logout(){
  this._auth.logout();
}
 Profile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '500px',
      height: '400px',
      data: {
        id:localStorage.getItem("id")
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
