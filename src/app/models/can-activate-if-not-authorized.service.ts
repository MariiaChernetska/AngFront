import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class CanActivateIfNotAuthorizedService implements CanActivate {

  constructor(private loginService: LoginService) {}

  canActivate() {
    return !this.loginService.isLoggedIn();
  }
}