import { Component, inject } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})

export class ReservationListComponent {

  service =
    inject(ReservationService);

}