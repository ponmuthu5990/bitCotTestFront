import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  
  headingmsg: string;
  title: string;
  hide : boolean;
  model: any = {};
  loading = false;
  queryParams: any={};
  errorMsg:any;
  Unauthorized: boolean;
  msgs: Message[] = [];
  rememberMe: boolean = false; 
  constructor(
      private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService,
      private notificationService:NotificationService) { 
        document.querySelector("body").style.cssText = "";  
      }

  ngOnInit() {

    this.headingmsg = 'Welcome!';
    this.title = 'Please sign in with your existing login.';
    this.hide = true;
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.queryParams=Object.assign({}, this.route.snapshot.queryParams)["p"];
    
  }

  onRememberMeStatusChanged(e){
    this.rememberMe = e.checked;
    console.log(e);
  }


  openSignUp(){
    this.router.navigate(['/signup']);
  }
  login() {
    console.log("login");
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
              if (data["status"]){
                if(data["data"].active == 0){
                  this.router.navigate(['/signin'], { queryParams: { "r":'/signin', "i" : data["data"].userId, "a" : data["data"].active}});
                }else{
                  localStorage.setItem("login_status","1");
                  if(data["data"].roleId == 1){
                    this.router.navigate(["bitCotTestFront/admin"]);
                  }else{
                    this.router.navigate(["bitCotTestFront/user"]);
                  }
                }         
              }else{
                this.errorMsg = data["message"];
                this.Unauthorized = true;
                this.loading = false;
              }
            },
            error => {
              //this.alertService.error(error["error"].message);
              this.errorMsg = error["error"].message;
              this.Unauthorized = true;
                this.loading = false;
            });
  }
}
