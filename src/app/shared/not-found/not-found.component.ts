import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone:true,
})
export class NotFoundComponent {
constructor(private _route:Router){}
  back(){

    this._route.navigate(["/dashboard"])
  }
}
