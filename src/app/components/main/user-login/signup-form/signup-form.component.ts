import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../../models/User';
import { Role } from '../../../../models/Role';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CancelDialogComponent } from '../../../popups/custom-dialogue/cancel-dialogue.components';
import { SUPERADMIN_ID, USER_ID } from '../../../../config/constants';
import { UserService } from '../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from '../../../../services/role.service';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../../services/notification.service';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  @ViewChild('f') formValues:NgForm;
  userGroupId:number;
  alphabetPattern = "[a-zA-Z ]*";
  organizationPattern = "[a-zA-Z, ]*";
  numericPattern = "[0-9]*";
  alphaNumericPattern = "[a-zA-Z0-9 ]*";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  hide : boolean;
  user: User = new User();

  userRoleArray: Role[] = [];
  userRoleStatus ; newuserRoleStatus = false;




  customDialogRef: MatDialogRef<CancelDialogComponent>;
  partnerList: Role[];
  currentUser:User;
  superAdminRoleId:number=SUPERADMIN_ID;

  constructor(private userService: UserService, private router: Router,public dialog: MatDialog,
    public userRoleService: RoleService, private confirmationService: ConfirmationService, 
    private notificationService:NotificationService,
      private activatedRoute: ActivatedRoute,private authenticationService: AuthenticationService) {   
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
    this.router.navigate(["/signin"]);
    this.notificationService.success("", message);
    } else
    this.notificationService.error("", message);
  }

  ngOnInit() {
    this.currentUser=this.authenticationService.currentUser;
  }

  
  onRemoveUserRole(item: any) {   

  }

  openUserRole(){   
  }

  onClickedOutside(e: Event, items) {
    let count = 0;
    this.checkopenditems(items);
  }

  checkopenditems(item) {
    let opendedItem = item;
    switch (opendedItem) {
    
      case "userRole":
        this.userRoleStatus = this.userRoleStatus === true ? !this.userRoleStatus : this.userRoleStatus;
        this.newuserRoleStatus = !this.newuserRoleStatus;
      
        break; 
    }
  }
  
  saveUser(f:NgForm) {
    this.formValues = f;
    console.log(this.userRoleArray)
      this.user.roleId = USER_ID;  
    console.log(this.user);
    this.authenticationService.signup(this.user,this); 
  }
    
  reset(f: NgForm){
    f.resetForm();
    this.userRoleArray=[];
  }

  clear(){
    this.router.navigate(['../'],{ relativeTo: this.activatedRoute });
    
  }
  
}
