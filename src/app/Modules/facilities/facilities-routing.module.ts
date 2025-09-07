import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditFacilitiesComponent } from './Components/add-edit-facilities/add-edit-facilities.component';

const routes: Routes = [

{path:'add',component:AddEditFacilitiesComponent},
{path:'edit/:id',component:AddEditFacilitiesComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilitiesRoutingModule { }
