import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { PublicLayoutComponent } from '../layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from '../layouts/private-layout/private-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,

    children: [
      {
        path: '',
        loadComponent: () =>
          import('../features/home/home.component')
            .then(c => c.HomeComponent)
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../features/auth/pages/login/login.component')
            .then(c => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../features/auth/pages/register/register.component')
            .then(c => c.RegisterComponent)
      },
       {
        path: 'restaurants',
        loadComponent: () =>
          import('../features/restaurants/pages/restaurant-list/restaurant-list.component')
            .then(c => c.RestaurantListComponent)
      },
      {
        path: 'restaurants/:id',
        loadComponent: () =>
          import('../features/restaurants/pages/restaurant-detail/restaurant-detail.component')
            .then(c => c.RestaurantDetailComponent)
      },
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        loadComponent: () =>
          import('../features/home/home.component')
            .then(c => c.HomeComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../features/profile/profile.component')
            .then(c => c.ProfileComponent)
      },
       {
        path: 'restaurants',
        loadComponent: () =>
          import('../features/restaurants/pages/restaurant-list/restaurant-list.component')
            .then(c => c.RestaurantListComponent)
      },
      {
        path: 'restaurants/:id',
        loadComponent: () =>
          import('../features/restaurants/pages/restaurant-detail/restaurant-detail.component')
            .then(c => c.RestaurantDetailComponent)
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('../features/reservations/pages/reservation-list/reservation-list.component')
            .then(c => c.ReservationListComponent)
      },
      {
        path: 'reservations/create',
        loadComponent: () =>
          import('../features/reservations/pages/reservation-create/reservation-create.component')
            .then(c => c.ReservationCreateComponent)
      },
      {
        path: 'reservations/create/:id',
        loadComponent: () =>
          import(
            '../features/reservations/pages/reservation-create/reservation-create.component'
          ).then(
            c => c.ReservationCreateComponent
          )
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../features/profile/pages/user-profile/user-profile.component')
            .then(c => c.UserProfileComponent)
      },
      {
        path: 'profile/edit',
        loadComponent: () =>
          import('../features/profile/pages/edit-profile/edit-profile.component')
            .then(c => c.EditProfileComponent)
      },
      {
        path: 'profile/preferences',
        loadComponent: () =>
          import('../features/profile/pages/preferences/preferences.component')
            .then(c => c.PreferencesComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
