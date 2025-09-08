import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacilitiesListComponent } from './Modules/facilities/Components/facilities-list/facilities-list.component';
import { HomeComponent } from './shared/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './Core/Guards/auth.guard';
import { adminGuard } from './Core/Guards/admin.guard';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';

export const routes: Routes = [
    {path:'',redirectTo:'auth',pathMatch:'full'},
    {path:'auth',loadChildren:()=>import('./Core/auth/auth.module').then(m=>m.AuthModule)},
    {path:'dashboard',canActivate:[authGuard,adminGuard] ,component:DashboardComponent,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'facilities',component:FacilitiesListComponent}
    ]},
    {path:'**',component:NotFoundComponent},
    
];
