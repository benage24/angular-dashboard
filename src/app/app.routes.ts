import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
 
  {
    path: '',
    loadChildren: () => import('../app/components/layout/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'login',
    loadComponent: () => import('../app/pages/login/login.component').then(c => c.LoginComponent),
  },
];
