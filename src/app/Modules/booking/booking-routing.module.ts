import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './Components/booking-list/booking-list.component';

const routes: Routes = [
  {path:'',component:BookingListComponent,title:'Booking'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
