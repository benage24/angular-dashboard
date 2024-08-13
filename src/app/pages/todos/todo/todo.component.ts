import { Component } from '@angular/core';
import { TodoAddComponent } from '../todo-add/todo-add.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTimes,
  faPrint,
  faMessage,
  faSave,
  faCheckCircle,
  faTrash,
  faEdit,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoAddComponent,CommonModule,FontAwesomeModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  faTrash = faTrash;
  faEdit=faEdit

items=[
  {
    name:"I have to go office.",
    date:"Feb 6, 2023",
    status:true
  },
  {
    name:"I have to go office.",
    date:"Feb 6, 2023",
    status:true
  },
  {
    name:"I have to go office.",
    date:"Feb 6, 2023",
    status:true
  },
  {
    name:"I have to go office.",
    date:"Feb 6, 2023",
    status:true
  }

]
}
