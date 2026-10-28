import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../../restaurants/services/restaurant.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Restaurant } from '../../../restaurants/models/restaurant.model';

@Component({
  selector: 'app-create-restaurant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-restaurant.html',
  styleUrl: './create-restaurant.css'
})
export class CreateRestaurantComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private restaurantService = inject(RestaurantService);
  private authService = inject(AuthService);

  form = this.fb.group({

    name: ['', Validators.required],
    description: ['', Validators.required],
    cuisineType: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    openingHour: ['', Validators.required],
    closingHour: ['', Validators.required],
    capacity: [50, [Validators.required, Validators.min(1)]],
    averagePrice: [30, Validators.required],
    availableTables: [10, [Validators.required, Validators.min(1)]]

  });

save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    const owner = this.authService.currentUser();
    const restaurant: Restaurant = {

      id: Date.now(),
      ownerId: owner?.id ?? 0,
      name: this.form.value.name!,
      description: this.form.value.description!,
      cuisineType: this.form.value.cuisineType!,
      address: this.form.value.address!,
      city: this.form.value.city!,
      phone: this.form.value.phone!,
      email: this.form.value.email!,
      openingHour: this.form.value.openingHour!,
      closingHour: this.form.value.closingHour!,
      capacity: this.form.value.capacity!,
      availableTables: this.form.value.availableTables!,
      averagePrice: this.form.value.averagePrice!,
      rating: 0,
      imageUrl: 'https://picsum.photos/400/250?' + Date.now()

    };

    this.restaurantService.addRestaurant(restaurant);
    this.router.navigate(['/owner/restaurants']);

  }

}