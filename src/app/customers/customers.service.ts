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

    let url = GlobalVars.apiHost+'api/Customers';
    return this.http.get(url);
  }
  getCustomerTypes(){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    let url = GlobalVars.apiHost+'api/dictionaries/customerTypes';
    return this.http.get<CustomerType[]>(url);
  }
  saveCustomer(customer:Customer){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let url = GlobalVars.apiHost+'api/Customers';
    
    return this.http.post(url, customer, options)

  }
  getCustomer(id:number){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let url = GlobalVars.apiHost+'api/Customers/'+id;
    
    return this.http.get(url)

  }
  deleteCustomer(customer:Customer){
    let options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let url = GlobalVars.apiHost+'api/Customers/'+customer.id;
    
    return this.http.delete(url)

  }
  getUserCustomer(){
      let options = 
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      };
      let url = GlobalVars.apiHost+'api/Customers/forUser';
      
      return this.http.get(url)
  
    
  }

}
