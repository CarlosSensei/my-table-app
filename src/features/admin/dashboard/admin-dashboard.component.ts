import { Component, computed, inject } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { RestaurantService } from '../../restaurants/services/restaurant.service';
import { ReservationService } from '../../reservations/services/reservation.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  private authService = inject(AuthService);
  private restaurantService = inject(RestaurantService);
  private reservationService = inject(ReservationService);

  usersCount = computed(() => {

    const users = JSON.parse(localStorage.getItem('users') ?? '[]');

    return users.length;
  });

  restaurantsCount = computed(() => this.restaurantService.restaurants().length);
  reservationsCount = computed(() => this.reservationService.reservations().length);

}
