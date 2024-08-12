import { Routes } from '@angular/router';

export const routes: Routes = [
 
  {
    path: 'admin',
    loadChildren: () => import('../app/components/layout/admin/admin.module').then(m => m.AdminModule),
  },
];
