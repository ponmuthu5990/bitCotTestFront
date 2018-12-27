import { Component, OnInit, ViewChild, ElementRef, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { User } from '../../../../../models/User';
import { NgForm } from '@angular/forms';
import { merge } from 'rxjs/operator/merge';
import { ResponseCallback } from '../../../../../models/ResponseCallback';
import { Router, ActivatedRoute } from '@angular/router';
//import { UserGroup } from '../../../../../models/UserGroup';
import { Role } from '../../../../../models/Role';
//import { UserGroupService } from '../../../../../services/usergroup.service';
import { RoleService } from '../../../../../services/role.service';
import {ConfirmationService} from 'primeng/api';
import { NotificationService } from '../../../../../services/notification.service';
import { AuthenticationService } from '../../../../../services/authentication.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';




@Component({
  selector: 'app-edit-userlist',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  //encapsulation:ViewEncapsulation.None
})
export class EditUserListComponent implements OnInit, ResponseCallback {

 

  url:any = "../../../../../../assets/images/user.png";
  alphabetPattern = "[a-zA-Z ]*";
  numericPattern = "[0-9 ]*";
  alphaNumericPattern = "[a-zA-Z0-9 ]*";
  organizationPattern = "[a-zA-Z, ]*";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public user: User = new User();
  public userTemp: User = new User();
  public _user: User = new User();

  userRoleArray: Role[] = [];
  userRoleStatus ; newuserRoleStatus = false;
  userToken: any;


  constructor(private _userService: UserService,private router:Router, private userRoleService: RoleService,
        private confirmationService: ConfirmationService,
        private notificationService:NotificationService,private authenticationService:AuthenticationService,
        private activatedRoute: ActivatedRoute) {
          this.userRoleService.fetchRoles();
   }
   
   cancel() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel changes?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clear();
      },
      reject: () => {
         
      }
  });
}

   responseCallback(message: string, result: any) {
    if (result == true) {
      this.router.navigate(['../'],{ relativeTo: this.activatedRoute });
      this.notificationService.success("", message);
    } else
    this.notificationService.error("", message);
  }

  ngOnInit() {
          if(this.authenticationService.currentUser && this.authenticationService.currentUser.userId!==undefined){
            this.userToken = this.authenticationService.currentUser.userId;
          }else{
            this.router.navigate(["/signin"]);
            return;
          }

    this._userService.userToEdit.subscribe(data => {
      if((data === undefined) || (Object.keys(data).length == 0)){
        this.router.navigate(['../'],{ relativeTo: this.activatedRoute });
      }  
      this.user=data;
      console.log(this._user);
      });

      this.userRoleService.Roles.subscribe(data => {
        setTimeout(() =>{
          if(data != undefined){
         this.userRoleArray = data;         
          }      
        }
      , 0)
      });
  }

  confirmUser(f:NgForm) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',    
      accept: () => {      
        this.updateBasic(f)
      },
      reject: () => {
         
      },
     
  });
  }



  updateBasic(f:NgForm){
      console.log(this.user);
    this._userService.update(this.user,this,undefined);
     }


clear(){
  this.router.navigate(['../'],{ relativeTo: this.activatedRoute });
}

  
}
