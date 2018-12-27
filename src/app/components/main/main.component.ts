import { Component, OnInit, ElementRef, Optional, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CustomDialogComponent } from '../popups/custom-dialogue/custom-dialogue.component';
import { Message } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  customDialogRef: MatDialogRef<CustomDialogComponent>;
  msgs: Message[] = []; 
  uploadProgressModel:any;
  footerInfo:any;
  headerLogo:any;
  logginedUser:User;
  togglemenu:boolean=false;
  public themeInfo:any={};
  productLogoName:String;
  companyLogoName:String;
  constructor(public dialog?:MatDialog,public elementRef?:ElementRef,
              public authenticationService?:AuthenticationService,
            public route?:ActivatedRoute) {
            
            this.uploadProgressModel={};              
   }

   ngOnInit() {   

    this.productLogoName="";
    this.companyLogoName="";   
  

    this.route.data.subscribe(data => {
      if(data.brandingData){
        this.footerInfo=data.brandingData;
        if(data.brandingData && data.brandingData.product_logo)
          this.footerInfo.productLogoUrl = data.brandingData.product_logo;
        if(data.brandingData && data.brandingData.company_logo){
          this.footerInfo.companyLogoUrl = data.brandingData.company_logo;
          this.headerLogo = data.brandingData.company_logo;
        }         
         var cssText:string="";
            Object.keys(data.brandingData).forEach(key =>{
              if(data.brandingData[key] && key != 'product_logo' && key != 'company_logo'){
                this.themeInfo[key]=data.brandingData[key];
                cssText+=key+": "+this.themeInfo[key]+ "; ";
              }
            })
            document.querySelector("body").style.cssText = cssText;  
         }         
      });

    this.uploadProgressModel={}; 
    this.logginedUser=this.authenticationService.currentUser; 
  }

  onClickedOutsideMain(Event){    
    var target = event.target || event.srcElement || event.currentTarget;
    if((Event.target.id!="ok") && (Event.target.id!="cancel") && 
      !(Event.target.classList.contains("mat-dialog-title")) &&
      !(Event.target.classList.value.includes("mat")) &&
       
      !(Event.target.classList.contains("genassetform")) &&            
      !(Event.target.classList.contains("dialog")) &&
      !(Event.target.innerHTML=="Ok") &&
      !(Event.target.classList.contains("ng-star-inserted")) && 
      !(Event.target.classList.contains("mat-dialog-content"))){
      if(this.dialog.openDialogs.length>0){
        this.dialog.closeAll(); 
        Event.stopPropagation();
      }
    }
          
  }

  toggleSideMenu(value:boolean){
      if(value)
        this.togglemenu=!this.togglemenu;
      else
        this.togglemenu=false;
  }

}
