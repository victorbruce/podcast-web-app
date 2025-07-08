import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (token) {
    return true;
  }

  // preserve the target URL and redirect to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
