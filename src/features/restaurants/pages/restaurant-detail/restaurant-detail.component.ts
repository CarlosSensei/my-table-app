import {Component, inject} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss',
  imports: [RouterLink]
})

export class RestaurantDetailComponent {

  private route = inject(ActivatedRoute);
  private service = inject(RestaurantService);

  restaurant = this.service.restaurants()
      .find(r => r.id === Number(this.route.snapshot.paramMap.get('id')));

}