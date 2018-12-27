import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { CMS_URL  } from '../../config/constants';
import { filter } from 'rxjs/operators';
import { User } from '../../models/User';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  topMenuToggle:boolean=false;


  cms_url:string=CMS_URL;
  title: any;
  permissionIds:string[]=[];
  @Input() set logginedUser(user :User){
    if(user && user.userId !== undefined){
 
    }   
  }

  constructor(private location?: Location, private route?: ActivatedRoute, private router?: Router) {
   }

  ngOnInit() {
    console.log(this.route);
    if (this.title === undefined) {
      var path = location.pathname.split('/');
      if (path.length > 2) {
        // this.title = location.pathname.split('/')[2];
        const sidebar = path[path.indexOf(CMS_URL)+1];
        if (sidebar !== 'dashboard') {
          this.title = sidebar;
        }else{
          this.title = path[1];
        }
      } else {
        this.title = path[1];
      }
    }
    this.router.events.pipe(
    filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {

      // var root = this.router.routerState.snapshot.root;
      // while (root) {
      //     if (root.children && root.children.length) {
      //         root = root.children[0];
      //     } else if (root.data && root.data["id"]) {
      //         console.log("root id: "+root.data["id"]);
      //         return;
      //     } else {
      //         return;
      //     }
      // }
      console.log("pathname: "+location.pathname);
      var path = location.pathname.split('/');
      if (this.location.path() !== '') {
        if (path.length > 2) {
          // this.title = location.pathname.split('/')[2];
          const sidebar = path[path.indexOf(CMS_URL)+1];
          if (sidebar !== 'dashboard') {
            this.title = sidebar;
          }
        } else {
          this.title = path[1];
        }

      }
    });
  }
  getPermissionIds(){
    return this.permissionIds;
  }

  // preventPageLoad(e:Event){
  //   e.preventDefault();
  // }

} 
