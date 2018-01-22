import { Injectable } from '@angular/core';
import {RequestOptions} from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'RxJS/Rx';
import {GlobalVars} from '../GlobalVars'
//import {CookieService} from 'angular2-cookie/core';
@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  logIn(loginObj){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    let url = GlobalVars.apiHost+'api/Login/LoginRequest';
    this.http.post(url, loginObj, options).subscribe((result)=>{
      console.log(result)
         //this.cookie.putObject('authorizationData', { token: result.token, userName: result.userName });
          //this.success();
       }, 
       (error)=>{
          let er:LoginError = JSON.parse(error._body);
         // this.fail(er);
        
       });
   }
}
class LoginResult{
  constructor(success: boolean, message: string){
    this.success = success;
    this.message = message;
  }
  success: boolean;
  message: string;
}
class LoginError{
    message: string;
    modelState: {
      "user.Login": Array<string>,
      "user.Password": Array<string>
    }
}
