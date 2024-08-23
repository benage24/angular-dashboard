import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppconfigService } from '../../../services/appconfig.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './todo-sidebar.component.html',
  styleUrl: './todo-sidebar.component.css'
})
export class TodoSidebarComponent {
  todoList!:any
  constructor(public dialog: MatDialog, 
    private appConfig: AppconfigService, 
   private route: ActivatedRoute,
      private todoService:TodoService,
     private subscriptionService: SubscriptionService,
     private router: Router
     ){

  }
  ngOnInit(){
    this.getTodoList()
  }
  getTodoList(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.todoService.find$(`todos`).subscribe({
        next:(res: any)=>{
           this.appConfig.onStopWaiting();
           
           this.todoList =   res
            // this.next=res.next
            // this.prev=res.previous
            console.log("rrtr",this.todoList);
            const totalPages = Math.ceil(res.count/res.page_size );
  
            // Populate the pages array
         //   this.pages = Array.from({ length: totalPages }, (_, i) => i+1 );
    
        },
        error: (e) => {
              console.log(e);
               this.appConfig.onStopWaiting();
            },
  
      })
    )
   
  }
}
