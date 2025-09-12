import { Component, HostListener } from '@angular/core';
import { SideNavService } from '../Services/side-nav.service';
import { fadeInOut } from '../Helper/helper';
import {MatIconModule} from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface IMenu{
    title:string,
    icon:string,
    menuLink?:string,
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone:true,
  animations:[fadeInOut],
  imports:[MatIconModule,NgClass,RouterLinkActive,RouterLink]
})
export class SidebarComponent {
SideBarOpened:boolean=true;
screenWidth=0;
constructor(private _SideNavService:SideNavService ) {}
ngOnInit(): void {
  this._SideNavService.setWidth(window.innerWidth);
  this._SideNavService.isOpened$.subscribe((value) => {this.SideBarOpened=value;});
  this._SideNavService.screenWidth$.subscribe((value)=>{this.screenWidth=value;})
}

@HostListener('window:resize',['$event'])
onResize(event:any){
  let widthScreen = window.innerWidth;
  if (widthScreen <= 768) {
    this._SideNavService.setIsOpened(false);
    this._SideNavService.setWidth(widthScreen);
  }else{
    this._SideNavService.setWidth(widthScreen);
  }
}
ToggleNav(){
  var isOpen = this._SideNavService.getIsOpened();
    isOpen = !isOpen;
    this._SideNavService.setIsOpened(isOpen);
}
closeSideNav(){
  this._SideNavService.setIsOpened(false);
  this._SideNavService.setWidth(window.innerWidth);
}

menu:IMenu[]=[
  {
    title:"Home",
    icon:"home",
    menuLink:"/dashboard/home",
  },
    {
    title:"Facilites",
    icon:"dashboard",
    menuLink:"/dashboard/facilities",
  },
    {
    title:"Rooms",
    icon:"meeting_room",
    menuLink:"/dashboard/rooms",
  },
  {
    title:"Ads",
    icon:"ads_click",
    menuLink:"/dashboard/ads",
  },
  {
    title:"Booking",
    icon:"inbox_text_person",
    menuLink:"/dashboard/booking",
  }
  ,
  {
    title:"Users",
    icon:"group",
    menuLink:"/dashboard/users",
  },
  // {
  //   title:"Tasks",
  //   icon:"checklist",
  //   menuLink:"/dashboard/employee/tasks",
  //   isActive:this.isEmployee(),
  // },
]

}
