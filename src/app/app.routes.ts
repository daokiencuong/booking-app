import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'auth', loadComponent: () => import('./features/auth/auth').then(m => m.Auth) },
    { path: 'booking', loadComponent: () => import('./features/booking/booking').then(m => m.Booking) },
];
