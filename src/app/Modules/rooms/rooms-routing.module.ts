import { RoomsListComponent } from './Components/rooms-list/rooms-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditRoomsComponent } from './Components/add-edit-rooms/add-edit-rooms.component';
import { RoomViewComponent } from './Components/room-view/room-view.component';
import { ViewRoomSpecialEditionComponent } from './Components/view-room-special-edition/view-room-special-edition.component';

const routes: Routes = [
{path:'',component:RoomsListComponent},
{path:'add',component:AddEditRoomsComponent},
{path:'edit/:id',component:AddEditRoomsComponent},
{path:'details/:id',component:RoomViewComponent},
{path:'view-special/:id',component:ViewRoomSpecialEditionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
