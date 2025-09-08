import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SideNavService } from '../Services/side-nav.service';
import { AuthService } from '../../Core/auth/Services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone:true,
  styleUrls: ['./navbar.component.scss'],
  imports:[MatIconModule,MatMenuModule,MatButtonModule]
})
export class NavbarComponent {
  constructor(private sidnav:SideNavService,private _auth:AuthService,private Router:Router) {}
  userName:string | null=null;
  userEmail:string | null=null;
  isMobileSize:boolean=false;
  userImg:any;
  ngOnInit(): void {
    let username= localStorage.getItem("userName");
    this.userName = username;
    let imguser = localStorage.getItem("profileImage");
    this.userImg = imguser;
    let userEmail = localStorage.getItem("userEmail");
    this.userEmail = userEmail;
    this.sidnav.screenWidth$.subscribe({
      next:(res)=>{
        if(res >= 768){
          this.isMobileSize = true;
        }else{
        this.isMobileSize = false;

        }
      }
    })

  }
ChangePassword(){
  this.Router.navigate(['/auth/change-password'])
}
logout(){
  this._auth.logout();
    this.Router.navigate(['/auth/login'])

}
}
