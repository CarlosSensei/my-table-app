import { Routes } from '@angular/router';

import { authGuard } from '../core/guards/auth.guard';

import { customerGuard } from '../features/profile/guards/customer.guard';
import { ownerGuard } from '../features/owner/guards/owner.guard';
import { adminGuard } from '../features/admin/guard/admin.guard';

import { PublicLayoutComponent } from '../layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from '../layouts/private-layout/private-layout.component';

export const routes: Routes = [

  /**
   * PUBLIC
   */
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
      }

    ]
  },

  /**
   * AUTHENTICATED USERS
   */
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [authGuard],
    children: [

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
      },

      {
        path: 'reservations',
        canActivate: [authGuard, customerGuard],
        loadComponent: () =>
          import('../features/reservations/pages/reservation-list/reservation-list.component')
            .then(c => c.ReservationListComponent)
      },

      {
        path: 'reservations/create/:id',
        canActivate: [authGuard, customerGuard],
        loadComponent: () =>
          import('../features/reservations/pages/reservation-create/reservation-create.component')
            .then(c => c.ReservationCreateComponent)
      },
      {
        path: 'owner',
        canActivate: [authGuard, ownerGuard],
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import('../features/owner/pages/dashboard/dashboard')
                .then(c => c.OwnerDashboardComponent)
          },

          {
            path: 'restaurants',
            loadComponent: () =>
              import('../features/owner/pages/owner-restaurants/owner-restaurants.component')
                .then(c => c.OwnerRestaurantsComponent)
          },

          {
            path: 'restaurants/create',
            loadComponent: () =>
              import('../features/owner/pages/create-restaurant/create-restaurant')
                .then(c => c.CreateRestaurantComponent)
          },

          {
            path: 'restaurants/:id/edit',
            loadComponent: () =>
              import('../features/owner/pages/edit-restaurant/edit-restaurant.component')
                .then(c => c.EditRestaurantComponent)
          }

        ]
      },
      {
        path: 'admin',
        canActivate: [authGuard, adminGuard],
        loadComponent: () =>
          import('../features/admin/dashboard/admin-dashboard.component')
            .then(c => c.AdminDashboardComponent)
      }

    ]
  },
  /**
   * FALLBACK
   */
  {
    path: '**',
    redirectTo: ''
  }

];