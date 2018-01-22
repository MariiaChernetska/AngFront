import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {GlobalVars} from '../GlobalVars'
import {Customer, CustomerGeneral, Department, CustomerType} from '../models/customer' 

@Injectable()
export class CustomersService {

  constructor(private http: HttpClient) { }

  getAllCustomers(){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    let url = GlobalVars.apiHost+'api/Customer/GetAll';
    return this.http.get<CustomerGeneral[]>(url);
  }
  getCustomerTypes(){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    let url = GlobalVars.apiHost+'api/Customer/GetCustomerTypes';
    return this.http.get<CustomerType[]>(url);
  }
}
