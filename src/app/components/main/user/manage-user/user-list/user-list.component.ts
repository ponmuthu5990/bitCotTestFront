import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { User } from '../../../../../models/User';
import { MatTableDataSource, MatPaginator, MatDialogRef, MatDialog } from '@angular/material';
import { CustomDialogComponent } from '../../../../popups/custom-dialogue/custom-dialogue.component';
import { UserService } from '../../../../../services/user.service';
import { Router } from '@angular/router';
import { MainComponent } from '../../../main.component';
import { RoleService } from '../../../../../services/role.service';
import { Role } from '../../../../../models/Role';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/primeng';
import { NotificationService } from '../../../../../services/notification.service';
import { AuthenticationService } from '../../../../../services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  //encapsulation:ViewEncapsulation.None,
  providers:[ConfirmationService]
})
export class UserListComponent extends MainComponent implements OnInit {
  
  action:string="actions";
  columns = [   
    { columnDef: 'userName', header: 'Name',    cell: (element: any) => `${element.userName}`,selected:true , disabled:true},
    { columnDef: 'emailid',     header: 'Email Id',   cell: (element: any) => `${element.emailId}`,selected:true , disabled:false    },
    { columnDef: 'mobileNumber',     header: 'Mobile Number',   cell: (element: any) => `${element.mobileNumber}`,selected:false , disabled:false    },
    { columnDef: 'createdDate',     header: 'Created Date',   cell: (element: any) => `${element.createdDate}`,selected:false , disabled:false    },
    { columnDef: 'password', header: 'Password',    cell: (element: any) => `${element.password}`,selected:false , disabled:false},
    { columnDef: 'status', header: 'Status',    cell: (element: any) => `${element.status}`,selected:false , disabled:false},
    { columnDef: 'actions',   header: 'Action', cell: (element: any) => `${element.id}`,selected:true , disabled:true},
  ];
  datePipe = new DatePipe("en-US");
  lengthOfItem: number = 0;
  displayedColumns:string[]=[];
  list:User[]=[];
  model:any={};
  statusList:any[]=[];
  //userGroupList:UserGroup[]=[];
  roleList:Role[]=[];  
  searchText:String;
  statuscodes:any[];

  dataSource=new MatTableDataSource(this.list);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  customDialogRef: MatDialogRef<CustomDialogComponent>;
  constructor(private userService:UserService,private router:Router,
    public dialog: MatDialog,public elementRef: ElementRef,//private userGroupService: UserGroupService,
    private roleService: RoleService,
    private confirmationService: ConfirmationService,private notificationService:NotificationService,
    public authenticationService:AuthenticationService) {
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
        this.deleteUser(id);
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

  ngAfterViewInit() {
    this.applyFilter();
    this.paginator.page.subscribe(data=>{ 
      if(!this.paginator.hasNextPage())
        this.userService.fetchUsers();
    });
  }

  ngOnInit() {
    this.columns.forEach(element =>{
      if(element.selected==true) this.displayedColumns.push(element.columnDef);
    });  
    this.userService.editUser={};

    this.model.userGroupForListing=-1;
    this.model.role=-1;
    this.model.status=-1;     
    this.userService.Users.subscribe(data => {
        setTimeout(() =>{
        if(data.length){
          this.list=data;
     
          this.dataSource=new MatTableDataSource(this.list);
          this.dataSource.paginator = this.paginator;
         
        }        
      }
      , 0)    
    });

   
    this.roleService.Roles.subscribe(data => {
      if(data.length>0){
        this.roleList=data;
      }
    });
  }

  onSearchChange(searchName:string){
    this.applyFilter();
  }

  onUserGroupChange(){
    this.applyFilter();
   
  }



  

  applyFilter() {
    this.paginator.length=0;
    this.paginator.pageIndex=0;
    this.list=[];
    this.dataSource=new MatTableDataSource(this.list);
    //this.dataSource.paginator = this.paginator;
    var searchText="";
    if(this.model.searchText!==undefined)
      searchText=this.model.searchText        
    searchText = searchText.trim(); // Remove whitespace
    this.userService.clearUsersForList();    
    this.userService.fetchUsers();
      
  }    


  add(){
    this.userService.editUser={};
    this.router.navigate([this.router.url+'/adduser']); 
  }


  edit(id:number){
    var item=this.list.find(element => element.id==id);
    this.userService.editUser=item;
    console.log(item);
    this.router.navigate([this.router.url+'/edituser']);
  }

  deleteUser(id:number){  
    this.userService.delete(id).subscribe(response =>{
      if(response["status"]==true){
          this.notificationService.success("","Congrats !!! You have successfully deleted User");
          this.list=this.list.filter(user =>{
            return user.id!=id;
          });
          this.dataSource=new MatTableDataSource(this.list);
          if(this.lengthOfItem > 0 && this.lengthOfItem%this.paginator.pageSize == 1){
            this.paginator.previousPage();
          }
          this.dataSource.paginator = this.paginator;
      }else{
        this.notificationService.error("","Congrats !!! You have successfully updated Basic Information");
      }
    },  error => console.log("Error: ", error));    
  }

  onClickColoumn(coloumnObj:any,e:Event){      
    e.stopPropagation();
  }

onSelectionChange(coloumnObj:any,e:Event){
  coloumnObj.selected=!coloumnObj.selected;
  this.displayedColumns=[];
  this.columns.forEach(element =>{
    if(element.selected==true) this.displayedColumns.push(element.columnDef);
  });
}

openDialog(userId:number) {
  
}

}

