import { Component, OnInit } from '@angular/core';
import {CustomersService} from './customers.service'
import {Customer, CustomerGeneral, CustomerType} from '../models/customer' 
import { FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomersService]
})

export class CustomersComponent implements OnInit {
  customers: CustomerGeneral[];
  customerTypes: CustomerType[]; 
  generalInfoForm: FormGroup;
  constructor(private customersService: CustomersService) {
    this.generalInfoForm = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'phone': new FormControl('', Validators.required),
      'address': new FormControl('',[Validators.required]),
      'comment': new FormControl(''),
      'email': new FormControl('',[Validators.required]),
      'type': new FormControl('', Validators.required),

    });

  }

  ngOnInit() {
    let newThis = this;
    this.customersService.getAllCustomers().subscribe((result:CustomerGeneral[])=>{
        newThis.customers = result;
       }, 
       (error)=>{});
   
       this.customersService.getCustomerTypes().subscribe((result:CustomerType[])=>{
        newThis.customerTypes = result;
       }, 
       (error)=>{});
   
  }
  saveCustomer(){


  }

}

