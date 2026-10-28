import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../restaurants/services/restaurant.service';
import { Restaurant } from '../../../restaurants/models/restaurant.model';

@Component({
  selector: 'app-edit-restaurant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.css'
})

export class EditRestaurantComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private restaurantService = inject(RestaurantService);

  restaurantId = 0;

  form = this.fb.group({

    name: ['', Validators.required],
    description: ['', Validators.required],
    cuisineType: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]

  });

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const restaurant = this.restaurantService.getById(id);

    if (!restaurant) {

      this.router.navigate(['/owner/restaurants']);

      return;
    }

    this.restaurantId = restaurant.id;

    this.form.patchValue({
      name: restaurant.name,
      description: restaurant.description,
      cuisineType: restaurant.cuisineType,
      city: restaurant.city,
      address: restaurant.address,
      phone: restaurant.phone,
      email: restaurant.email
    });

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.restaurantService.updateRestaurant(
      this.restaurantId,
      this.form.value as Partial<Restaurant>
    );

    this.router.navigate(['/owner/restaurants']);

  }

}