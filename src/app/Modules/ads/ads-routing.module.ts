import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsListComponent } from './Components/ads-list/ads-list.component';

const routes: Routes = [
{path:'',component:AdsListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
