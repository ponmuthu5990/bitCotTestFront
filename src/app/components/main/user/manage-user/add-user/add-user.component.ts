import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { User } from '../../../../../models/User';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { ResponseCallback } from '../../../../../models/ResponseCallback';
import { Router, ActivatedRoute } from '@angular/router';
import { SUPERADMIN_ID, } from '../../../../../config/constants';
import { RoleService } from '../../../../../services/role.service';
import { Role } from '../../../../../models/Role';
import { CustomDialogComponent } from '../../../../popups/custom-dialogue/custom-dialogue.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CancelDialogComponent } from '../../../../popups/custom-dialogue/cancel-dialogue.components';
import { ConfirmationService } from 'primeng/primeng';
import { NotificationService } from '../../../../../services/notification.service';
import { AuthenticationService } from '../../../../../services/authentication.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit, ResponseCallback {

  @ViewChild('f') formValues:NgForm;
  alphabetPattern = "[a-zA-Z ]*";
  organizationPattern = "[a-zA-Z, ]*";
  numericPattern = "[0-9]*";
  alphaNumericPattern = "[a-zA-Z0-9 ]*";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  user: User = new User();

  userRoleArray: Role[] = [];

  customDialogRef: MatDialogRef<CancelDialogComponent>;
  currentUser:User;
  superAdminRoleId:number=SUPERADMIN_ID;

  constructor(private userService: UserService, private router: Router,public dialog: MatDialog,   
    public userRoleService: RoleService,
     private confirmationService: ConfirmationService,private notificationService:NotificationService,
      private activatedRoute: ActivatedRoute,private authenticationService: AuthenticationService) {
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
confirmUser(f:NgForm) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',    
    accept: () => {      
      this.saveUser(f)
    },
    reject: () => {
       
    },
   
});
}
  responseCallback(message: string, result: any) {
    if (result == true) { 
      this.userRoleArray = [];
      this.router.navigate(['../'],{ relativeTo: this.activatedRoute });
      this.notificationService.success("", message);
    } else
    this.notificationService.error("", message);
  }

  ngOnInit() {
    this.currentUser=this.authenticationService.currentUser;
    this.userRoleService.Roles.subscribe(data => {
      setTimeout(() =>{
        if(data != undefined){
       this.userRoleArray = data;         
        }      
      }
    , 0)
    });
  }

 
  
  saveUser(f:NgForm) {
    this.formValues = f;
      console.log(this.userRoleArray)

    console.log(this.user);
    this.userService.save(this.user,this); 
  }
    
  reset(f: NgForm){
    f.resetForm();
    this.userRoleArray=[];
  }

  clear(){
    this.router.navigate(['../'],{ relativeTo: this.activatedRoute });
  }
  
}
