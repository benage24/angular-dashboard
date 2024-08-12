import { Routes } from '@angular/router';

export const routes: Routes = [
 
  {
    path: '',
    loadChildren: () => import('../app/components/layout/admin/admin.module').then(m => m.AdminModule),
  },
];
