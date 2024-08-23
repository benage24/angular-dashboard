import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppFeeback } from '../../../enums/app-feedback.enum';
import { AppconfigService } from '../../../services/appconfig.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../components/entities/todo';
import { FormsModule } from '@angular/forms';
import { AppUtilitie } from '../../../utilities/app-utility';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.css'
})
export class TodoAddComponent {
  todo:Todo=new Todo()
  constructor(public dialog: MatDialog, 
    private appConfig: AppconfigService, 
   private route: ActivatedRoute,
      private todoService:TodoService,
     private subscriptionService: SubscriptionService,
     private router: Router
 
     ){

  }

  saveTodo() {
    console.log("ttttttttttttttttttttttttttttttttttttttttt");
    this.appConfig.onStartWaiting();
    this.todoService.save$(this.todo,'todos/').subscribe({
      next: (res: any) => {
         this.appConfig.onStartWaiting();
        if (res.status == '400') {
          AppUtilitie.openInfoDialog(this.dialog, res.status.message);
        } else {
          this.router.navigate(
            ['admin/todo/list'],
            { replaceUrl: true }
          );
          console.log("ttttttttttttttttttttttttttttttttttttttttt");
          
          //  AppUtilitie.openInfoDialog(this.dialog, AppFeeback.SAVE_SUCCESS);
          this.todo = new Todo();
        }
        // console.log("respoane",res)
      },
      error: (e:any) => {
         this.appConfig.onStopWaiting();
        // AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
      },
    });
  }
}
