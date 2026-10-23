import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  private fb = inject(FormBuilder);

  registerForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]
    },
    {
      validators: this.passwordMatchValidator()
    }
  );

  private passwordMatchValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        return { passwordsNotMatch: true };
      }

      return null;
    };
  }

  onSubmit(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm.value);

    /*
    Futuro:

    this.authService.register({
      ...
    }).subscribe(...)
    */
  }

  get passwordsNotMatch(): boolean {
    return !!(this.registerForm.errors?.['passwordsNotMatch']
      && this.registerForm.get('confirmPassword')?.touched);
  }
}