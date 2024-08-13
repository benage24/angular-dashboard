import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoMainComponent } from './todo-main/todo-main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadComponent: () => import('./todo-main/todo-main.component').then(m => m.TodoMainComponent),
  // },
  {
    path: '',
    component: TodoMainComponent,
    children: [
      {
        path: 'list',
        loadComponent: () => import('../../pages/todos/todo/todo.component').then(m => m.TodoComponent),

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
