import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  isDarkMode = signal(false);

  constructor() {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {

      this.isDarkMode.set(true);

      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme(): void {

    const darkMode = !this.isDarkMode();

    this.isDarkMode.set(darkMode);

    if (darkMode) {

      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');

    } else {

      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');

    }

  }
}