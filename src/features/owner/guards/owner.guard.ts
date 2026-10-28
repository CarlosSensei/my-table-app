import { inject } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";

export const ownerGuard: CanActivateFn = () => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  const user =
    authService.currentUser();

  if (user?.role === 'OWNER') {
    return true;
  }

  router.navigate(['/']);

  return false;
};