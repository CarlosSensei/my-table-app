import { Injectable, computed, signal } from '@angular/core';
import { User } from '../models/user.model';
import { RegisterRequest } from '../models/register-request.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly USERS_KEY = 'users';

  currentUser = signal<User | null>(null);

  isAuthenticated = computed(() => this.currentUser() !== null);

  constructor() {

    const storedUser = localStorage.getItem(this.USER_KEY);

    if (storedUser) {

      this.currentUser.set(
        JSON.parse(storedUser)
      );

    }
  }

  login(email: string, password: string): boolean {

    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return false;
    }

    const currentUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
    localStorage.setItem(this.USER_KEY, JSON.stringify(currentUser));

    this.currentUser.set(currentUser);

    return true;
  }

  register(request: RegisterRequest): boolean {

    const users = this.getUsers();
    const existingUser = users.find(user => user.email === request.email);

    if (existingUser) {
      return false;
    }

    users.push({
      id: Date.now(),
      name: request.name,
      surname: request.surname,
      email: request.email,
      password: request.password,
      role: request.role
    });

    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    return true;
  }

  logout(): void {

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.currentUser.set(null);
  }

  getToken(): string | null {

    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getUsers(): any[] {

    const users = localStorage.getItem(this.USERS_KEY);

    if (users) {
      return JSON.parse(users);
    }

    const defaultUsers = [
      {
        id: 1,
        name: 'Administrador',
        surname: 'Sistema',
        email: 'admin@test.com',
        password: '12345678',
        role: 'ADMIN'
      },
      {
        id: 2,
        name: 'Carlos',
        surname: 'Cliente',
        email: 'user@test.com',
        password: '12345678',
        role: 'CUSTOMER'
      },
      {
        id: 3,
        name: 'Juan',
        surname: 'Propietario',
        email: 'owner@test.com',
        password: '12345678',
        role: 'OWNER'
      }
    ];

    localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));

    return defaultUsers;
  }
}