import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { ResponseCode } from './responsecode';
import { ResponseCallback } from '../models/ResponseCallback';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { Role } from '../models/Role';
import { BASE_URL } from '../config/constants';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';

const API = "role";

@Injectable()
export class RoleService {

  public editRole:any;
  baseUrl: string;
  private _roleList: BehaviorSubject<Role[]>;
  private dataStore: {  // This is where we will store our data in memory
    RoleStore: Role[]
  }; 

  constructor(private http: HttpClient,private authenticationService:AuthenticationService,
    private router:Router) {
        this.baseUrl = BASE_URL+API;
        this.dataStore = { RoleStore: []};
        this._roleList = <BehaviorSubject<Role[]>>new BehaviorSubject([]);
        this.fetchRoles();
   }



   fetchRoles(){
        var headers={};
        if(!(this.authenticationService.isLoggedIn && this.authenticationService.currentUser && 
          this.authenticationService.currentUser.userId)){
            headers = new HttpHeaders().set("ghest", "true");
        }else{
            headers = new HttpHeaders();
        }

        let params = new HttpParams();
        if(this.authenticationService.currentUser && this.authenticationService.currentUser.userId!==undefined){
         // blah blah
          }else{
            this.router.navigate(["/signin"]);
            return;
          }
       this.http.get(BASE_URL+API,{headers: headers, params: params}).subscribe(data =>{
        if(data["status"]==true){
            this.dataStore.RoleStore = data["data"];
            this._roleList.next(Object.assign({}, this.dataStore).RoleStore);
         }
        }
         ,  error => console.log("Error: ", error));
  }




  get roleToEdit(){
    return Observable.of(this.editRole);
  }
  get Roles(){
    return this._roleList;
  }

  save(role: Role,callback:ResponseCallback) {
    if(this.authenticationService.currentUser && this.authenticationService.currentUser.userId!==undefined){
      role.createdBy= this.authenticationService.currentUser.userId;
      role.partnerId= this.authenticationService.currentUser.partnerId;
      }else{
        this.router.navigate(["/signin"]);
        return;
      }
    return this.http.post(this.baseUrl, role).subscribe(data => {
      if(data["status"]==true){
         this.dataStore.RoleStore.push(data["data"]);
         this._roleList.next(Object.assign({}, this.dataStore).RoleStore);
         callback.responseCallback("Congrats !!! You have successfully added Role",true);
      }else
         callback.responseCallback(data["message"],false);
    }, error => {
      console.log('Could not create role.');
      callback.responseCallback('Sorry!!! Something went wrong. Please try again or Contact administrator',false)
    });

  }

  update(role: Role,callback:ResponseCallback) {
    if(this.authenticationService.currentUser && this.authenticationService.currentUser.userId!==undefined){
      role.updatedBy= this.authenticationService.currentUser.userId;
      role.partnerId= this.authenticationService.currentUser.partnerId;
      }else{
        this.router.navigate(["/signin"]);
        return;
      }
   return this.http.put(this.baseUrl, role).subscribe(data => {
     console.log(data);
     if(data["status"]==true){
        this.fetchRoles();
        callback.responseCallback("Congrats !!! You have successfully updated Role",true);
      } else {
        if(data["errorCode"]==1){
          callback.responseCallback(data["message"],data["data"]);
        } else {
          callback.responseCallback(data["message"],false);
        }        
      } 
    },error => {
      console.log('Could not update role.');
      callback.responseCallback('Sorry!!! Something went wrong. Please try again or Contact administrator',false)
    });

  }
  changeStatus(role: Role,callback:ResponseCallback){
    return this.http.put(this.baseUrl+"/changeStatus", role).subscribe(data => {      
      if(data["status"]==true){
        this.fetchRoles();
        callback.responseCallback("Congrats !!! You have successfully updated Role",true);
      } else {       
          callback.responseCallback(data["message"],false);              
      }     
    }, error => {
      console.log('Could not update role.');
      callback.responseCallback('Sorry!!! Something went wrong. Please try again or Contact administrator',false)
    });
  }
  
  delete(id:number,callback:ResponseCallback){
    var formData: any = new FormData();   
    var userId:number;
    if(this.authenticationService.currentUser && this.authenticationService.currentUser.userId!==undefined){
      userId= this.authenticationService.currentUser.userId;    
      }else{
        this.router.navigate(["/signin"]);
        return;
      }
      if(userId && userId!==undefined){
        formData.append('deletedBy',userId);
      }
    return this.http.delete(this.baseUrl+"/"+ id)
    .subscribe(data => {
      if(data["status"]==true){
        this.fetchRoles();
        callback.responseCallback("Congrats !!! You have successfully deleted Role",true);
      }else
        callback.responseCallback(data["message"],false);
     
    }, error => {
      console.log('Could not delete role.');
      callback.responseCallback('Sorry!!! Something went wrong. Please try again or Contact administrator',false)
    }); 
   
  }

  getData():Observable<any>{
    return this._roleList;
  }  


}
