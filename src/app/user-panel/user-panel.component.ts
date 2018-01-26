import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { CustomersService } from '../customers/customers.service';
import { CustomerGeneral, Customer } from '../models/customer';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  providers: [CustomersService]
})
export class UserPanelComponent implements OnInit {
  userName: string;
  customer: CustomerGeneral;
  constructor(private loginService: LoginService, private customersService: CustomersService) {

    this.customer = new CustomerGeneral();
   }

  ngOnInit() {
    this.userName = this.loginService.getUserName();
    this.customersService.getUserCustomer().subscribe((res:CustomerGeneral)=>{
      this.customer = res;
    });
  }

}
