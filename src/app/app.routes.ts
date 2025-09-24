import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacilitiesListComponent } from './Modules/facilities/Components/facilities-list/facilities-list.component';
import { HomeComponent } from './shared/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './Core/Guards/auth.guard';
import { adminGuard } from './Core/Guards/admin.guard';
import { AddEditFacilitiesComponent } from './Modules/facilities/Components/add-edit-facilities/add-edit-facilities.component';
import { MasterComponent } from './master-layout/components/master/master.component';
import { LandingPageComponent } from './master-layout/components/landing-page/landing-page.component';
import { DetailsComponent } from './master-layout/components/details/details.component';
import { ExploreComponent } from './master-layout/components/explore/explore.component';
import { PaymentComponent } from './master-layout/components/payment/payment.component';

export const routes: Routes = [
  { path: '', redirectTo: 'master', pathMatch: 'full' },
  {
    path: 'master',component:MasterComponent,children:[
      {path:'',redirectTo:'home', pathMatch:'full',title:'Staycation-Home'},
      {path:'home',component:LandingPageComponent,title:'Staycation-Home'},
      {path:'details/:id',component:DetailsComponent,title:'Room Details'},
      {path:'explore',component:ExploreComponent,title:'Staycation-Explore'},
      {path:'payment/:id',component:PaymentComponent,title:'Staycation-Payment'},
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./Core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, adminGuard],
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'facilities', component: FacilitiesListComponent },
      { path: 'facilities/add', component: AddEditFacilitiesComponent },
      { path: 'facilities/edit/:id', component: AddEditFacilitiesComponent },
      {
      path: 'rooms',
      loadChildren: () =>
          import('./Modules/rooms/rooms.module').then(m => m.RoomsModule)
      },
      {
      path: 'ads',
      loadChildren: () =>
          import('./Modules/ads/ads.module').then(m => m.AdsModule)
      },
      {
      path: 'booking',
      loadChildren: () =>
          import('./Modules/booking/booking.module').then(m => m.BookingModule)
      },
      {
      path: 'users',
      loadChildren: () =>
          import('./Modules/users/users.module').then(m => m.UsersModule)
      }
    ],
  },
  { path: '**', component: NotFoundComponent },
];
