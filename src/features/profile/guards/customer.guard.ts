import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

export const customerGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();

  if (user?.role === 'CUSTOMER') {
    return true;
  }

  router.navigate(['/']);

  return false;
};