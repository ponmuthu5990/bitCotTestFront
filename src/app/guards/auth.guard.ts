import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
    queryParams:any={};
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("URL:  "+state);
        if (localStorage.getItem('usertoken')) {   
            // logged in so return true
            return true;
        }else{
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/signin'], { queryParams: { "r":state.url }});
            return false;
        } 

    }
}