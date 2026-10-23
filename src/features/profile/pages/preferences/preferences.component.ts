import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})

export class PreferencesComponent {

  private fb = inject(FormBuilder);
  private themeService = inject(ThemeService);

  form = this.fb.group({

    receiveNotifications: [true],

    favouriteCuisine: ['Italiana'],

    darkMode: [false]

  });

  save(): void {

    const preferences = this.form.getRawValue();

    console.log('Preferencias guardadas:', preferences);

    // Futuro:
    // this.profileService.savePreferences(preferences);

  }

}