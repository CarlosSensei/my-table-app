import { Injectable, signal} from '@angular/core';
import { Reservation } from '../models/reservation.model';

@Injectable({
    providedIn: 'root'
})

export class ReservationService {

    reservations = signal<Reservation[]>([]);

    addReservation(reservation: Reservation): void {

        this.reservations.update(current => [...current, reservation]);
    }

    cancelReservation(id: number): void {

        this.reservations.update(items =>
            items.map(item => item.id === id
                ? {...item, status: 'CANCELLED'}: item));
    }
}