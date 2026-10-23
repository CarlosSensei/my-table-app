import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);

  isAuthenticated = computed(() => this.currentUser() !== null);

  constructor() {

    const token = localStorage.getItem(this.TOKEN_KEY);

    if (token) {

      this.currentUser.set({
        id: 1,
        name: 'Administrador',
        email: 'admin@test.com',
        role: 'ADMIN'
      });
    }
  }

  login(email: string, password: string): boolean {

    if (email === 'admin@test.com' && password === '12345678') {

      localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');

      this.currentUser.set({
        id: 1,
        name: 'Administrador',
        email: email,
        role: 'ADMIN'
      });

      return true;
    }

    return false;
  }

  register(user: any): boolean {

    return true;
  }

  logout(): void {

    localStorage.removeItem(this.TOKEN_KEY);

    this.currentUser.set(null);
  }

  getToken(): string | null {

    return localStorage.getItem(this.TOKEN_KEY);
  }
}