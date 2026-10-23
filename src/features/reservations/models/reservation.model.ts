export interface Reservation {

  id: number;
  restaurantId: number;
  restaurantName: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;

  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'CANCELLED';
}