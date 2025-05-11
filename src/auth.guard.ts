import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export function authGuard(): CanActivateFn {
  return (_snapShot, {url}) => {
    const hasToken = typeof localStorage.getItem('authData') !== 'object',
      router = inject(Router);

    if (url === '/bejelentkezes') {
      if (hasToken) {
        router.navigateByUrl('karaktervalaszto', {replaceUrl: true});
        return false;
      }
    } else if (!hasToken) {
      router.navigateByUrl('bejelentkezes', {replaceUrl: true});
      return false;
    }

    return true;
  };
}
