import {Component, computed, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { RestaurantSearchComponent } from '../../components/restaurant-search/restaurant-search.component';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, RestaurantCardComponent, RestaurantSearchComponent],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})

export class RestaurantListComponent {

  private service = inject(RestaurantService);

  search = signal('');

  restaurants = computed(() => {

    const text = this.search().toLowerCase();

    return this.service
      .restaurants()
      .filter(r => r.name.toLowerCase().includes(text));
  });

}