import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})

export class EditProfileComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor() {

    const user = this.authService.currentUser();

    if (user) {

      this.form.patchValue({
        name: user.name,
        email: user.email
      });

    }

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;

    }

    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      return;
    }

    this.authService.currentUser.set({
      ...currentUser,
      name: this.form.value.name!,
      email: this.form.value.email!
    });

    this.router.navigate([
      '/profile'
    ]);

  }

}