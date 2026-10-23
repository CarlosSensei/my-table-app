import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { RestaurantService } from '../../../restaurants/services/restaurant.service';
import { Restaurant } from '../../../restaurants/models/restaurant.model';

@Component({
    selector: 'app-reservation-create',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './reservation-create.component.html',
    styleUrl: './reservation-create.component.scss'
})

export class ReservationCreateComponent {

    private fb = inject(FormBuilder);
    private reservationService = inject(ReservationService);
    private restaurantService = inject(RestaurantService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    form = this.fb.group({

        reservationDate: ['', Validators.required],
        reservationTime: ['', Validators.required],
        guests: [2, Validators.required]

    });

    availableTimes: string[] = [];
    restaurant?: Restaurant;

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {

            const restaurantId = Number(params.get('id'));
            const restaurant = this.restaurantService.getById(restaurantId);

            if (restaurant) {

                this.restaurant = restaurant;

                this.generateTimeSlots(
                    restaurant.openingHour,
                    restaurant.closingHour
                );

            }

            console.log(this.route.snapshot.paramMap.get('id'));

            console.log(this.restaurant);

        });

    }

    submit(): void {

        if (this.form.invalid) {
            return; 
        }

        this.reservationService.addReservation({
        id: Date.now(),
        restaurantId: this.restaurant!.id,
        restaurantName: this.restaurant!.name,
        reservationDate: this.form.value.reservationDate!,
        reservationTime: this.form.value.reservationTime!,
        guests: this.form.value.guests!,
        status: 'PENDING'
        });

        this.router.navigate(['/reservations']);
    }  
    
    private generateTimeSlots(openingHour: string, closingHour: string): void {

        this.availableTimes = [];

        const [startHour, startMinute] = openingHour.split(':').map(Number);
        const [endHour, endMinute] = closingHour.split(':').map(Number);
        const current = new Date();
        
        current.setHours(startHour, startMinute, 0, 0);

        const end = new Date();

        end.setHours(endHour, endMinute, 0, 0);

        while (current <= end) {

            const hours = current.getHours().toString().padStart(2, '0');
            const minutes = current.getMinutes().toString().padStart(2, '0');

            this.availableTimes.push(`${hours}:${minutes}`);

            current.setMinutes(current.getMinutes() + 15);
        }
    }
}