import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authHeader: string;
  constructor(private cookieService: CookieService) {
    this.authHeader = this.getAuthorizationHeader();
  }
  getAuthorizationHeader(){
    let authData: any = this.cookieService.getObject('authorizationData');  
    console.log(authData)
    if(authData && authData.token){
        return "Bearer "+authData.token;
    }
    else{
        return null;
    }
   
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   if(this.authHeader){
        // Clone the request to add the new header.
        const authReq = req.clone({headers: req.headers.set('Authorization', this.authHeader)});
        return next.handle(authReq);
        
    }
    else{
        return next.handle(req);
        
    }

    // Pass on the cloned request instead of the original request.
  }
}