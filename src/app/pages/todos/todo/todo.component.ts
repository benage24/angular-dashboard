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
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AppconfigService } from '../../../services/appconfig.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../components/entities/todo';
import { AppUtilitie } from '../../../utilities/app-utility';
import { AppFeeback } from '../../../enums/app-feedback.enum';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoAddComponent,CommonModule,FontAwesomeModule,FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  faTrash = faTrash;
  faEdit=faEdit
  faCheck=faCheck
  isEdit:boolean=false

  items = [
    {
      name: "I have to go office.",
      date: "Feb 6, 2023",
      status: true
    },
    {
      name: "I have to go office.",
      date: "Feb 6, 2023",
      status: true
    },
    {
      name: "I have to go office.",
      date: "Feb 6, 2023",
      status: true
    },
    {
      name: "I have to go office.",
      date: "Feb 6, 2023",
      status: true
    }
  ].map(item => ({
    ...item,
    isEdit: false // Add isEdit property to each item
  }));
  todo:Todo=new Todo()
  todoId!:number
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
editTodo(item:any){
 
  item.isEdit = !item.isEdit;
  console.log(item)
}
getCkeckbox(e:Event){
  console.log("checkout box",e.target)
}
 
 updateTodo(data:Todo) {
  this.todo.title=data.title

  this.appConfig.onStartWaiting();
  this.todoService.update$(this.todo,`todos/${data.id}/`).subscribe({
    next: (res: any) => {
       this.appConfig.onStartWaiting();
      if (res.status == '400') {
        AppUtilitie.openInfoDialog(this.dialog, res.status.message);
      } else {
        this.router.navigate(
          ['admin/todo/list'],
          { replaceUrl: true }
        );
        this.isEdit=!data.isEdit;
        console.log("ttttttttttttttttttttttttttttttttttttttttt",this.isEdit);
        
        AppUtilitie.openInfoDialog(this.dialog, AppFeeback.SAVE_SUCCESS);
        this.todo = new Todo();
        this.isEdit=!data.isEdit;
        this.todoList.title=" "
      }
      // console.log("respoane",res)
    },
    error: (e:any) => {
       this.appConfig.onStopWaiting();
      AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
    },
  });
}

deleteTodo(id: string) {
  console.log('todo id', id);
  this.appConfig.onStartWaiting();

  this.todoService.delete$(`todos/${id}/`).subscribe({
    next: (res: any) => {
      this.appConfig.onStopWaiting();
      this.todoList = this.todoList.filter(
        (todoItem: any) => todoItem.id !== id
      );

      
    },
    error: (e) => {
      console.log(e);
      this.appConfig.onStopWaiting();
    },
  });
}
getTodoList(){
  this.appConfig.onStartWaiting();
  this.subscriptionService.add(
    this.todoService.find$(`todos`).subscribe({
      next:(res: any)=>{
         this.appConfig.onStopWaiting();
         
         this.todoList =   res.map((item:any) => ({
            ...item,
            isEdit: false // Add isEdit property to each item
          }));
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