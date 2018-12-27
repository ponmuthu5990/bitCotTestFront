import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RoleService } from '../../../../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { NotificationService } from '../../../../../services/notification.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css'],
  encapsulation:ViewEncapsulation.None,
  providers:[ConfirmationService]
})
export class RoleEditComponent implements OnInit {
  alphabetPattern = "[a-zA-Z ]*";
  model:any={};  
  constructor(private roleService:RoleService,private router:Router,
    private confirmationService: ConfirmationService,private notificationService:NotificationService,
    private activatedRoute:ActivatedRoute) {
      this.model.name="";
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
confirm(f:NgForm) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',    
    accept: () => {      
      this.save(f)
    },
    reject: () => {
       
    },
   
});
}

reEnable(role){
  this.confirmationService.confirm({
    message: 'Role <b>'+role.name +'</b> is already exist and is inactive. <br> do you want reactivate?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',    
    accept: () => {      
      this.activateRole(role)
    },
    reject: () => {
      this.clear();
    },
  
  });
}
  ngOnInit() {   
      this.roleService.roleToEdit.subscribe(data => {
        if((data === undefined) || (Object.keys(data).length == 0)){
          const url = this.router.url.split("/");
          if(url[url.length - 1] == "manageedit"){
            this.router.navigate(['../'],{ relativeTo: this.activatedRoute });
          }
         
        }  
        if(data !== undefined){
          this.model=data;
        }
      });
  }

  responseCallback(message: string,result: any){ 
    if(result==true){
        this.router.navigate(['../'],{ relativeTo: this.activatedRoute });      
        this.notificationService.success("",message);
    } else {   
      if(result.id && result.id != null){
        this.reEnable(result);
      } else {   
        this.notificationService.error("",message); 
      }
    }  
       
  }

  save(f:NgForm){
    console.log(f);
    if(this.model.id===undefined){
      this.roleService.save(this.model,this);
    }
    else{
      if(f.controls["name"].dirty){
        this.roleService.update(this.model,this);
      }    
    }     
  } 
  activateRole(role){
    if(role.id && role.id != null){
      role.active = 1;
      this.roleService.changeStatus(role,this);
    }
  }
  clear(){
    this.router.navigate(['../'],{ relativeTo: this.activatedRoute });
  }
}
