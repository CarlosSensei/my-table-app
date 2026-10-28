import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  errorMessage = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(): void {

    this.errorMessage = '';

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';
    const success = this.authService.login(email, password);

    if (!success) {

      this.errorMessage = 'Email o contraseña incorrectos';

      return;
    }

    const user = this.authService.currentUser();

    switch (user?.role) {

      case 'OWNER':

        this.router.navigate(['/owner/dashboard']);

        break;

      case 'ADMIN':

        this.router.navigate(['/admin']);

        break;

      case 'CUSTOMER':

        this.router.navigate(['/']);

        break;

      default:

        this.router.navigate(['/']);

    }

  }

}