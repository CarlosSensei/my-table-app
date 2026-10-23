import { Injectable, signal } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {

restaurants = signal<Restaurant[]>([
  {
    id: 1,
    name: 'La Tagliatella',
    description: 'Restaurante italiano especializado en pasta fresca, pizzas artesanas y recetas tradicionales.',
    cuisineType: 'Italiana',
    address: 'Passeig de Gràcia, 125',
    city: 'Barcelona',
    email: 'barcelona@latagliatella.com',
    rating: 4.5,
    imageUrl: 'https://picsum.photos/400/250?1',
    openingHour: '13:00',
    closingHour: '23:30',
    phone: '+34 932123456',
    averagePrice: 30,
    capacity: 120,
    availableTables: 15
  },
  {
    id: 2,
    name: 'Sushi House',
    description: 'Cocina japonesa premium con sushi, sashimi y menús degustación.',
    cuisineType: 'Japonesa',
    address: 'Gran Vía, 44',
    city: 'Madrid',
    email: 'contact@sushihouse.es',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/400/250?2',
    openingHour: '12:30',
    closingHour: '23:00',
    phone: '+34 911223344',
    averagePrice: 45,
    capacity: 80,
    availableTables: 10
  },
  {
    id: 3,
    name: 'El Asador Vasco',
    description: 'Carnes a la brasa y productos de temporada del norte de España.',
    cuisineType: 'Vasca',
    address: 'Calle Ledesma, 15',
    city: 'Bilbao',
    email: 'reservas@asadorvasco.es',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/400/250?3',
    openingHour: '13:00',
    closingHour: '00:00',
    phone: '+34 944556677',
    averagePrice: 55,
    capacity: 90,
    availableTables: 8
  },
  {
    id: 4,
    name: 'Mar Azul',
    description: 'Especialidades mediterráneas, arroces y pescado fresco del día.',
    cuisineType: 'Mediterránea',
    address: 'Paseo Marítimo, 32',
    city: 'Valencia',
    email: 'info@marazul.es',
    rating: 4.3,
    imageUrl: 'https://picsum.photos/400/250?4',
    openingHour: '12:00',
    closingHour: '23:00',
    phone: '+34 963445566',
    averagePrice: 35,
    capacity: 140,
    availableTables: 18
  },
  {
    id: 5,
    name: 'Taco Mex',
    description: 'Sabores auténticos de México con tacos, fajitas y margaritas.',
    cuisineType: 'Mexicana',
    address: 'Calle Sierpes, 88',
    city: 'Sevilla',
    email: 'hola@tacomex.es',
    rating: 4.4,
    imageUrl: 'https://picsum.photos/400/250?5',
    openingHour: '13:00',
    closingHour: '23:30',
    phone: '+34 954112233',
    averagePrice: 25,
    capacity: 100,
    availableTables: 12
  },
  {
    id: 6,
    name: 'Dragon Wok',
    description: 'Buffet asiático con una gran variedad de platos chinos y tailandeses.',
    cuisineType: 'Asiática',
    address: 'Avenida Independencia, 76',
    city: 'Zaragoza',
    email: 'reservas@dragonwok.es',
    rating: 4.1,
    imageUrl: 'https://picsum.photos/400/250?6',
    openingHour: '12:30',
    closingHour: '22:30',
    phone: '+34 976778899',
    averagePrice: 20,
    capacity: 180,
    availableTables: 25
  },
  {
    id: 7,
    name: 'La Parrilla Argentina',
    description: 'Carnes premium argentinas cocinadas al carbón.',
    cuisineType: 'Argentina',
    address: 'Calle Larios, 17',
    city: 'Málaga',
    email: 'contacto@laparrillaargentina.es',
    rating: 4.9,
    imageUrl: 'https://picsum.photos/400/250?7',
    openingHour: '13:00',
    closingHour: '00:30',
    phone: '+34 952998877',
    averagePrice: 60,
    capacity: 110,
    availableTables: 14
  },
  {
    id: 8,
    name: 'Green Garden',
    description: 'Opciones vegetarianas y veganas elaboradas con productos ecológicos.',
    cuisineType: 'Vegetariana',
    address: 'Carrer Aragó, 210',
    city: 'Barcelona',
    email: 'info@greengarden.es',
    rating: 4.6,
    imageUrl: 'https://picsum.photos/400/250?8',
    openingHour: '12:00',
    closingHour: '22:00',
    phone: '+34 931445566',
    averagePrice: 22,
    capacity: 70,
    availableTables: 9
  },
  {
    id: 9,
    name: 'Burger Lab',
    description: 'Hamburguesas gourmet con ingredientes artesanales y recetas propias.',
    cuisineType: 'Americana',
    address: 'Plaza Callao, 8',
    city: 'Madrid',
    email: 'hello@burgerlab.es',
    rating: 4.5,
    imageUrl: 'https://picsum.photos/400/250?9',
    openingHour: '13:00',
    closingHour: '23:59',
    phone: '+34 910556677',
    averagePrice: 18,
    capacity: 95,
    availableTables: 11
  }
]);

  getAll(): Restaurant[] {
    return this.restaurants();
  }

  getById(id: number): Restaurant | undefined {
    return this.restaurants()
      .find(r => r.id === id);
  }

}