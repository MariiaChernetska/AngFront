import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import {Router} from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor(private cookieService: CookieService, 
              private router: Router, 
              private loginService:LoginService) {

  }
  title = 'app';
  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
    if(!this.isLoggedIn){
      this.router.navigate(['/login'])
    }
    else{
      this.router.navigate(['/customers'])
      
    }
  }
 
  ngDoCheck() {
  
  }

}
