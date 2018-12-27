import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { map, filter, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { BASE_URL } from "../config/constants";
import {  } from "url-pattern";
declare var require: any
var UrlPattern = require('url-pattern');

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router,private authService: AuthenticationService){    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var api = request.url.replace(BASE_URL,'');

        if(api != 'v1/login' && this.authService.currentUser === undefined){
            this.router.navigate(['/signin']);     
            return;             
        }

        let currentUser:any={};
        try{
            currentUser = JSON.parse(atob(localStorage.getItem('usertoken') || ''));
        }catch(e){}


        if (currentUser.access_token && currentUser.refresh_token && !request.url.endsWith("signin") && !request.url.endsWith("signup")) {

            const headers = new HttpHeaders({
                'x-access-token': currentUser.access_token,
                'x-refresh-token': currentUser.refresh_token
              });         
          
              const cloneReq = request.clone({headers});

            return next.handle(cloneReq).do(res => {
                if (res instanceof HttpResponse) {
                  console.log('url:'+res.url+'---> status:', res.status);
                  if(res.headers.get("x-access-token")){
                    let user:any={};
                    currentUser.access_token=res.headers.get("x-access-token");  
                    localStorage.setItem('usertoken', btoa(JSON.stringify(currentUser)));
                  }

                  return res;
                  
                }
              },
              error => {
                console.log('url:'+error.url+'---> status:', error.status);
                if(error.status==403 || error.status==401){
                    if(localStorage.getItem("login_status")=="1"){
                        window.alert(error["error"].message);
                    }
                    localStorage.setItem("login_status","0");                   
                    localStorage.removeItem("usertoken");
                    this.authService.setIsLoggedIn(false);
                    this.router.navigate(['/signin']);     
                    return;             
                }
              });
        }
        else {
            console.log("request :"+JSON.stringify(request));
            return next.handle(request).do(res => { 
                if (res instanceof HttpResponse) {
                  console.log('url:'+res.url+'---> status:', res.status);
                }
              },
              error => {
                console.log('url:'+error.url+'---> status:', error.status);
                if(error.status==403 || error.status==401){
                    console.log("request:"+request+"status: "+error.status);
                    if(localStorage.getItem("login_status")=="1"){
                        window.alert(error["error"].message);
                    }
                    localStorage.setItem("login_status","0")
                    this.router.navigate(['/signin']); 
                    return;             
                }
            });
        };

    }

    containsAny(str, substrings) {
        for (var i = 0; i != substrings.length; i++) {
           var substring = substrings[i];
           if (str.indexOf(substring) != - 1) {
             return substring;
           }
        }
        return null; 
    }


}