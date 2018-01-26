import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {LoginService} from './login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage:Array<string> = [];

   emailValid: boolean = false;
  loginPristine: boolean = true;
  
  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      'login': new FormControl('',[Validators.required]),
      'password': new FormControl('', Validators.required)
    });

   
 
   }

  ngOnInit() {
  }

  onSubmit(){
      this.errorMessage = [];
      
        let loginObj = {
          'Username': this.loginForm.controls['login'].value,
          'Password': this.loginForm.controls['password'].value
        }
        console.log(loginObj)
        this.loginService.logIn(loginObj);
  }
 emailPatternValidator(control: FormControl) {

    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value)) {
      return null;
    }
    else {
      return {
        emailInvalid: true

      };
    }
  }

}
