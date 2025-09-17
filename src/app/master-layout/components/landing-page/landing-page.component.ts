import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LandingService } from '../../services/landing.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatIcon,FormsModule,MatDatepickerModule,MatFormFieldModule,TranslatePipe,RouterLink,ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  providers:[provideNativeDateAdapter()]
})
export class LandingPageComponent {
  value:any="1 Persone";
  counter:number=1;
  Response:any[]=[];
   range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private _landing:LandingService,private router: Router){}
  ngOnInit(): void {
    this.Explore();
  }
Add(){
  this.counter++;
  this.value= this.counter +' '+ 'Persone';

}
remove(){
  if(this.counter < 0){
    this.counter--;
  }else{
    this.counter = 1;
  }
  this.value= this.counter + ' ' + 'Persone';
}
Explore(){
  this._landing.getRooms().subscribe({
    next:(res)=>{
      this.Response = res.data.rooms;

    }
  })
}
Search(){
const { start, end } = this.range.value;
if (start != null && end != null) {
    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];
  this.router.navigate(['/master/explore'], { queryParams: { start:startStr, end:endStr } });
}else{

  alert("plase select")
}
}

}
