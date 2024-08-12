import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoHeaderComponent } from '../todo-header/todo-header.component';
import { TodoSidebarComponent } from '../todo-sidebar/todo-sidebar.component';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [RouterModule,TodoHeaderComponent,TodoSidebarComponent],
  templateUrl: './todo-main.component.html',
  styleUrl: './todo-main.component.css'
})
export class TodoMainComponent {

}
