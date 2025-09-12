import { RoomsListComponent } from './Components/rooms-list/rooms-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditRoomsComponent } from './Components/add-edit-rooms/add-edit-rooms.component';
import { RoomViewComponent } from './Components/room-view/room-view.component';

const routes: Routes = [
{path:'',component:RoomsListComponent},
{path:'add',component:AddEditRoomsComponent},
{path:'edit/:id',component:AddEditRoomsComponent},
{path:'details/:id',component:RoomViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
