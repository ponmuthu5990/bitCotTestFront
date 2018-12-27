import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { ResponseCode } from './responsecode';
import { ResponseCallback } from '../models/ResponseCallback';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { Observable } from "rxjs/Observable";
import { User } from '../models/User';
import { BASE_URL } from '../config/constants';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

const API = "user";

@Injectable()
export class UserService {

  public editUser:any={};
  baseUrl: string;
  private _userList: BehaviorSubject<User[]>;
  private _manageUserList: BehaviorSubject<User[]>;
  private dataStore: {  // This is where we will store our data in memory
    UserStore: User[],
    UserStoreForManageList: User[]
  };

  constructor(private http: HttpClient,private authenticationService:AuthenticationService,private router:Router) {
        this.baseUrl = BASE_URL+API;
        this.dataStore = { UserStore: [],UserStoreForManageList: []};
        this._userList = <BehaviorSubject<User[]>>new BehaviorSubject([]);
        this._manageUserList = <BehaviorSubject<User[]>>new BehaviorSubject([]);
        this.fetchUsers();
   }


  get userToEdit(){
    return Observable.of(this.editUser);
  }

  fetchUsers(){
       this.http.get(this.baseUrl).subscribe(data =>{
        if(data["status"]==true){
            this.dataStore.UserStore = data["data"];
            this._userList.next(Object.assign({}, this.dataStore).UserStore);
         }
        }
         ,  error => console.log("Error: ", error));
  }

  get Users(){
    return this._userList;
  }

  get UsersForList(){
    return this._manageUserList;
  }

  clearUsersForList(){
    this.dataStore.UserStoreForManageList=[];
    this._manageUserList.next(Object.assign({}, this.dataStore).UserStoreForManageList);
  }

  save(user: User,callback:ResponseCallback) {
    if(this.authenticationService.currentUser && this.authenticationService.currentUser.userId!==undefined){
    user.createdBy= this.authenticationService.currentUser.userId;
    }else{
      this.router.navigate(["/signin"]);
      return;
    }
    //user.userdetails.createdBy=1;
    return this.http.post(this.baseUrl, user).subscribe(data => {
      if(data["status"]==true){
        this.fetchUsers();
         callback.responseCallback("Congrats !!! You have successfully added User",true);
      }else
         callback.responseCallback(data["message"],false);
    }, error => {
      console.log('Could not save user.');
      callback.responseCallback('Sorry!!! Something went wrong. Please try again or Contact administrator',false)
    });

  }



  update(user: any,callback:ResponseCallback,status: number) {
   return this.http.put(this.baseUrl, user).subscribe(data => {      
      if(data["status"]==true){
        //this.fetchUsers();
        callback.responseCallback("Congrats !!! You have successfully updated User",true);
      }else
        callback.responseCallback(data["message"],false);
     
    }, error => {
      console.log('Could not update user.');
      callback.responseCallback('Sorry!!! Something went wrong. Please try again or Contact administrator',false)
    });

  }

  delete(id:number){
    var userId:number;
    if(this.authenticationService.currentUser && this.authenticationService.currentUser.userId!==undefined){
      userId= this.authenticationService.currentUser.userId;    
      }else{
        this.router.navigate(["/signin"]);
        return;
      }
        return this.http.delete(this.baseUrl+"/"+id).map(data => {return data});
  }

  getData():Observable<any>{
    return this._userList;
  }  


  getUserList(roleId:number,name: string): Observable<User[]> {
    var userId:number;
    if(this.authenticationService.currentUser && this.authenticationService.currentUser.userId!==undefined){
      userId= this.authenticationService.currentUser.userId;
      }else{
        this.router.navigate(["/signin"]);
        return;
      }
    let params = new HttpParams();
    if(name.trim()==""){
      return Observable.of([]);
    }
    params = params.append('search', name);
    if(roleId)
      params = params.append('roleId', roleId.toString());

      
    return this.http.get(this.baseUrl+"/basicdetails",{params:params}).map(data =>{
      if(data["status"]==true){
          return data["data"];
        }
      }
        ,  error => console.log("Error: ", error));
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
