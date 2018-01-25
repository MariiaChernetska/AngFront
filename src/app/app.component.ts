import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor(private cookieService: CookieService, private router: Router) {

  }
  title = 'app';
  ngOnInit() {
    this.isLoggedIn = this.checkIfLoggedIn();
  }
  checkIfLoggedIn() {
    let authData: any = this.cookieService.getObject('authorizationData');
    if (authData && authData.token) return true;
    return false;
  }
  logOut(){
    this.cookieService.remove('authorizationData');
    this.router.navigate(['/']);
  }
  ngDoCheck() {
    if (this.checkIfLoggedIn()) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }

}
