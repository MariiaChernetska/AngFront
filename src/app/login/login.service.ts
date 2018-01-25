import { Injectable } from '@angular/core';
import {RequestOptions} from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'RxJS/Rx';
import {GlobalVars} from '../GlobalVars'
import {CookieService} from 'angular2-cookie/core';
@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private cookieService:CookieService) { }
  logIn(loginObj){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let url = GlobalVars.apiHost+'api/Login/LoginRequest';
    this.http.post(url, loginObj, options).subscribe((result:any)=>{
         this.cookieService.putObject('authorizationData', { 
          token: result.token, 
          userName: result.userName,
          userRole: result.userRole
         });
       }, 
       (error)=>{
          
        
       });
   }
}

