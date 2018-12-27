import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BASE_URL } from '../config/constants';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { ResponseCallback } from '../models/ResponseCallback';

@Injectable()
export class AuthenticationService {
    currentUser:any;
    baseUrl:string;
    apiVersions:any[]=[];

    //loginType:number;
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,private router:Router) {
        this.baseUrl = BASE_URL;
        console.log("authentication service constructor");
        if(localStorage.getItem('usertoken')){
            this.currentUser = JSON.parse(atob(localStorage.getItem('usertoken') || ''));
            if(this.currentUser.access_token){
                this.loggedIn.next(true);
            }
        }

     }
        get isLoggedIn() {
        return this.loggedIn.asObservable();
        }

        setIsLoggedIn(status:boolean) {
            this.loggedIn.next(status);
        }

     login(username: string, password: string) {
         return this.http.post<any>(this.baseUrl+'login', { username: username, password: password})
             .map(response => {
                 // login successful if there's a jwt token in the response
                 if (response["status"] && response["data"].refresh_token && response["data"].access_token) {
                     // store user details and jwt token in local storage to keep user logged in between page refreshes
                     if(response["data"].active == 1){
                        this.loggedIn.next(true);
                        this.currentUser=response["data"];
                        localStorage.setItem('usertoken', btoa(JSON.stringify(this.currentUser)));
                        localStorage.setItem("login_status","1");
                     }
                 }
                 return response;
             });
     }

  
     signup(user: User,callback:ResponseCallback) {
        return this.http.post(this.baseUrl+"signup", user).subscribe(data => {
          if(data["status"]==true){
           callback.responseCallback("Congrats !!! You have successfully Register",true);
          }else
             callback.responseCallback(data["message"],false);
        }, error => {
          console.log('Could not save user.');
          callback.responseCallback('Sorry!!! Something went wrong. Please try again or Contact administrator',false)
        });
    
      }

     logout() {
         // remove user from local storage to log user out
         localStorage.removeItem('usertoken');
         localStorage.setItem("login_status","0");
         this.currentUser={};
         this.loggedIn.next(false);
     }


 
     
 

 }
