import { Routes } from '@angular/router';
import { Footer } from './shared/components/footer/footer';
import { PublicLayout } from './layouts/public-layout/public-layout';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    title: 'Booking Service',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard').then(
            (m) => m.Dashboard
          ),
      },
      {
        path: 'staff-manage',
        title: 'Staff Manage',
        loadComponent: () =>
          import('./features/admin/staff-manage/staff-manage').then(
            (m) => m.StaffManage
          ),
      },
      {
        path: 'service-manage',
        title: 'Service Manage',
        loadComponent: () =>
          import('./features/admin/service-manage/service-manage').then(
            (m) => m.ServiceManage
          ),
      },
      {
        path: 'calendar-view',
        title: 'Calendar View',
        loadComponent: () =>
          import('./features/admin/calendar-view/calendar-view').then(
            (m) => m.CalendarView
          ),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () =>
          import('./features/admin/setting/setting').then((m) => m.Setting),
      },
    ],
  },
  {
    path: 'staff',
    loadComponent: () =>
      import('./layouts/staff-layout/staff-layout').then((m) => m.StaffLayout),
  },
];
