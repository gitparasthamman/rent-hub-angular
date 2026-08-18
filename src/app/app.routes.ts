import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ApartmentDetails } from './features/apartments/apartment-details/apartment-details';
import { CreateApartment } from './features/apartments/create-apartment/create-apartment';
import { FavoritesComponent } from './features/apartments/favourites/favourites';
import { authGuard } from './core/guards/auth.guard';
import { ApartmentPreviewComponent } from './features/apartments/apartment-preview/apartment-preview';

export const routes: Routes = [ {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: Home
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'apartments/create',
    component: CreateApartment,
    canActivate: [authGuard]
  },

  {
    path: 'apartments/edit/:id',
    component: CreateApartment,
    canActivate: [authGuard]
  },

  {
    path: 'apartments/preview',
    component: ApartmentPreviewComponent,
    canActivate: [authGuard]
  },

  {
    path: 'apartments/:id',
    component: ApartmentDetails
  },

  {
    path: 'favourites',
    component: FavoritesComponent,
    canActivate: [authGuard]
  },


  {
    path: '**',
    redirectTo: 'home'
  }
];
