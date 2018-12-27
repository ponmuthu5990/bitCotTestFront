import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MainComponent } from '../../../main.component';
import { Role } from '../../../../../models/Role';
import { MatTableDataSource, MatPaginator, MatDialogRef, MatDialog } from '@angular/material';
import { CustomDialogComponent } from '../../../../popups/custom-dialogue/custom-dialogue.component';
import { RoleService } from '../../../../../services/role.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NotificationService } from '../../../../../services/notification.service';
import { AuthenticationService } from '../../../../../services/authentication.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent extends MainComponent implements OnInit {
  displayedColumns = ['name', 'actions'];
  lengthOfItem: number = 0;
  list:Role[]=[];
  test:any[]=[];
  dataSource=new MatTableDataSource(this.list);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  customDialogRef: MatDialogRef<CustomDialogComponent>;
  constructor(private roleService:RoleService,private router:Router,
    public dialog: MatDialog,public elementRef: ElementRef,private confirmationService: ConfirmationService,
    private notificationService:NotificationService,public authenticationService:AuthenticationService) {
      super(dialog,elementRef);
      this.roleService.fetchRoles();
   }
   delete(id:number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      
      accept: () => {
        this.lengthOfItem = this.list.length;
        this.deleteRole(id);
      },
      reject: () => {
         
      }
  });
}
   responseCallback(message: string,result: any){ 
    if(result==true)
    this.notificationService.success("",message);
    else
    this.notificationService.error("", message)     
  }

  ngOnInit() {
    this.roleService.editRole={};
    this.roleService.Roles.subscribe(data => {
      setTimeout(() =>{
        if(data != undefined){
          this.list=data; 
          this.dataSource=new MatTableDataSource(this.list);
          // If we have only one entry in a particular page and if that entry is deleted, backward arrow is not functional - added by ponnu - 17/10/18 # starts here
          if(this.lengthOfItem > 0 && this.lengthOfItem%this.paginator.pageSize == 1){
            this.paginator.previousPage();
          }
           // # ends here
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = function(data, filter: string): boolean {
            return data.name.toLowerCase().includes(filter);
          };
        }      
      }
    , 0)
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  add(){
    this.roleService.editRole={};
    this.router.navigate([this.router.url+'/add']);
  }


  edit(item:any){
    this.roleService.editRole=item;
    this.router.navigate([this.router.url+'/manageedit']);
  }

  deleteRole(id:number){
    //this.openDialog();
        this.roleService.delete(id,this);
  }

}

