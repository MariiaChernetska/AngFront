import { Injectable } from '@angular/core';
import {RequestOptions} from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'RxJS/Rx';
import {GlobalVars} from '../GlobalVars'
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private cookieService:CookieService, private router: Router) { }
  logIn(loginObj){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let url = GlobalVars.apiHost+'api/Login/LoginRequest';
    this.http.post(url, loginObj, options).subscribe((result:any)=>{
         this.cookieService.putObject('authorizationData', { 
          token: result.token, 
          userRoles: result.roles,
          userName: result.userName
         });
         if(this.isAdmin()){
          this.router.navigate(['/customers'])
          
         }
         else{
          this.router.navigate(['/userpanel'])
          
         }
       }, 
       (error)=>{
          
        
       });
   }
   isLoggedIn() {
    let authData: any = this.cookieService.getObject('authorizationData');
    if (authData && authData.token) return true;
    return false;
  }
  getUserRoles(){
    let authData: any = this.cookieService.getObject('authorizationData');
    return authData.userRoles;    
  }
  isAdmin(){
    let authData: any = this.cookieService.getObject('authorizationData'); 
    if(authData && authData.userRoles){
      if(authData.userRoles.find(z=>z=="Admin")) return true;      
    }
    return false;
  }
  getUserName(){
    let authData: any = this.cookieService.getObject('authorizationData');    
    if(authData) return authData.userName;
  }
  logOut(){
    let url = GlobalVars.apiHost+'api/Login/Logout';
    this.http.get(url).subscribe((res)=>{
      this.cookieService.remove('authorizationData');
      this.router.navigate(['/login'])
      
    })
   
  }
  getAuthorizationHeader(){
    let authData: any = this.cookieService.getObject('authorizationData');    
    if(authData && authData.token){
        return "Bearer ${authData.token}";
    }
    return null;
  }
}

