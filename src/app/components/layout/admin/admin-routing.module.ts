import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [

  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: 'todo',
        loadChildren: () => import('../../todo/todo.module').then(m => m.TodoModule),
      },
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
