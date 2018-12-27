import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  title: any;
  isLoggedIn: boolean=false;
  currentUser:User;
  topMenuIds:number[]=[1,2,3];
  headerSet: any;
  permissionIds: string[]=[];
  MENU_HOME_DISPLAY_STATUS:boolean=false;
  MENU_USER_DISPLAY_STATUS:boolean=false;
  MENU_ASSET_DISPLAY_STATUS:boolean=false;
  MENU_UPLOAD_DISPLAY_STATUS:boolean=false;
  MENU_GROUPSETTING_DISPLAY_STATUS:boolean=false;
  MENU_GENERALSETTINGS_DISPLAY_STATUS:boolean=false;

  @Input('hideAvatar') hideAvatar:boolean;


  @Input() set headerLogo(headerLogo :any){
    if(headerLogo && headerLogo != null){
      this.headerSet = headerLogo;      
    }
    else{
      this.headerSet = "assets/images/user.png";
    }
  }

  @Input() set logginedUser(user :User){
    if(user && user.userId !== undefined){
      this.currentUser = user;
      // this.permissionIds= this.currentUser.permissionData.map(permission =>{
      //   if(permission.read || permission.write || permission.delete)
      //     return permission.menuId;
      // })
      if(this.currentUser && (this.currentUser.profilePictureUrl == undefined || this.currentUser.profilePictureUrl == null ||
        this.currentUser.profilePictureUrl == "")){
          this.currentUser.profilePictureUrl="assets/images/user.png";
        }
      //this.displayMenu();
    }   
  }
  @Output() ontoggleMenu = new EventEmitter();
  topMenuToggle:boolean=false;
  constructor(private route: ActivatedRoute, private router: Router,
    private authenticationService:AuthenticationService) {
        
    }


  ngOnInit() {
    this.authenticationService.isLoggedIn.subscribe(status =>{
      this.isLoggedIn=status;
      this.currentUser=this.authenticationService.currentUser;

    });

    if(this.hideAvatar){
   ;
    }

  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/signin']);
  
  }

  openLogin(){
    this.router.navigate(['/signin'],{ queryParams:{"r":this.route.snapshot.url.join(''),"p":this.route.snapshot.queryParams["d"]}});
  }

 


  clickSideMenuIcon(){
    this.topMenuToggle = false;
    this.ontoggleMenu.emit(true);
  }

  openTopMenu(){
    this.topMenuToggle = !this.topMenuToggle;
    this.ontoggleMenu.emit(false);
  }
  
}
