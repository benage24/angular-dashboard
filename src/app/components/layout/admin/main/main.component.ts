import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { TodoMainComponent } from '../../../todo/todo-main/todo-main.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,RouterModule,TodoMainComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
