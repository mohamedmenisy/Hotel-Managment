import { Component, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { AdsRoutingModule } from "../../../Modules/ads/ads-routing.module";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/Services/language.service';

@Component({
  selector: 'app-navbar-home',
  standalone: true,
  imports: [AdsRoutingModule,RouterLink,RouterLinkActive,MatIconModule,MatMenuModule,MatButtonModule,TranslatePipe],
  templateUrl: './navbar-home.component.html',
  styleUrl: './navbar-home.component.scss',
})
export class NavbarHomeComponent {
  constructor(private langService: LanguageService) {}

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
}
