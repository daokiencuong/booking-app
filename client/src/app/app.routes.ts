import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'service',
        loadComponent: () => import('./features/admin/service/service').then(m => m.Service)
      },
      {
        path: 'staff',
        loadComponent: () => import('./features/admin/staff/staff').then(m => m.Staff)
      }
    ]
  },
  
];
