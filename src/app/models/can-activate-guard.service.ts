import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class AdminCanActivateGuardService implements CanActivate {

  constructor(private loginService: LoginService) {}

  canActivate() {
    if(this.loginService.isLoggedIn() && this.loginService.isAdmin()) return true;
    return false;
  }
}

