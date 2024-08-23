import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from '../../components/entities/login';
import { AppconfigService } from '../../services/appconfig.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 //boolean
 passView: boolean = true;
 typing: boolean = true;
 typingPass: boolean = true;
 //objects
 userLogin: UserLogin = new UserLogin();
 userErrors: any = {};
 //any
 loginUrl: any;
 constructor(
  // private dialog: MatDialog,
   private router: Router,
   private appConfig: AppconfigService,
   private authService: AuthService,
   private activaterouter: ActivatedRoute
 ) {}

 ngOnInit(): void {

   this.loginUrl = this.activaterouter.snapshot.queryParamMap.get('returnto');
 }

 toggleView() {
   this.passView = !this.passView;
 }


  login() {
    // this.appConfig.onStartWaiting();
    this.authService.login(this.userLogin).subscribe({
      next: (res: any) => {
        // this.appConfig.onStopWaiting();
        this.appConfig.onConnected(res);
            this.router.navigate(['/admin/todo/list']);
            console.log(res);
            
      },
      error: (e) => {
        //  this.appConfig.onStopWaiting();
        

        if (e.status === 400) {
          // Handle bad request
          // AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);

          console.log('Bad request:', e.error); // Log the error details
          // Display an error message to the user
        } else if (e.status === 401) {
          // Handle unaith
          // AppUtilitie.openInfoDialog(this.dialog,  AppFeeback.BAD_CREDENTIAL);
          console.log('Other error:', e.error);
          // Display a generic error message
        }else{
           // Handle other error
           console.log('Other error:', e.error);
           // Display a generic error message
        }
      },
    });

   
  }

}
