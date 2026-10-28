import { Component, inject, computed } from '@angular/core';
import { RestaurantService } from '../../../restaurants/services/restaurant.service';
import { RestaurantCardComponent } from '../../../restaurants/components/restaurant-card/restaurant-card.component';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-owner-restaurants',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './owner-restaurants.component.html',
  styleUrl: './owner-restaurants.component.css'
})

export class OwnerRestaurantsComponent {

  restaurantService = inject(RestaurantService);
  private authService = inject(AuthService);

  restaurants = computed(() => {

    const user =
      this.authService.currentUser();

    return this.restaurantService.restaurants()
      .filter(restaurant => restaurant.ownerId === user?.id);

  });

  deleteRestaurant(id: number): void {

    const confirmed = confirm('¿Deseas eliminar este restaurante?');

    if (!confirmed) {
      return;
    }

    this.restaurantService.deleteRestaurant(id);

  }

}