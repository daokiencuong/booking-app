import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'booking',
    pathMatch: 'full',
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/booking').then(m => m.BookingComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth').then(m => m.AuthComponent),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard(['owner'])],
    children: [
      { path: '', loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'services', loadComponent: () => import('./features/admin/services-management/services-management').then(m => m.ServicesManagementComponent) },
      { path: 'bookings', loadComponent: () => import('./features/admin/booking-management/booking-management').then(m => m.BookingManagementComponent) },
      { path: 'staffs', loadComponent: () => import('./features/admin/staff-management/staff-management').then(m => m.StaffManagementComponent) },
    ]
  },
  {
    path: 'staff',
    canActivate: [AuthGuard, RoleGuard(['staff'])],
    loadComponent: () => import('./features/admin/staff-management/staff-management').then(m => m.StaffManagementComponent),
  },
  {
    path: '**',
    redirectTo: 'booking',
  },
];
