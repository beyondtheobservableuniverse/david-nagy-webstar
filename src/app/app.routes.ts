import {Routes} from '@angular/router';
import {authGuard} from '@webstar/auth.guard';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/bejelentkezes',
  },
  {
    path: 'bejelentkezes',
    loadChildren: () => import('./pages/login/login.routes'),
    canActivate: [authGuard()],
  },
  {
    path: 'karaktervalaszto',
    loadChildren: () => import('./pages/characters/characters.routes'),
    canActivate: [authGuard()],
  },
];
