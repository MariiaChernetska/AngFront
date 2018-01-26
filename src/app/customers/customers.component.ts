import { Component, OnInit } from '@angular/core';
import {CustomersService} from './customers.service'
import {Customer, CustomerGeneral, CustomerType, CustomerViewModel} from '../models/customer' 
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { RandomGenerator } from '../helpers/RandomGenerator';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomersService]
})

export class CustomersComponent implements OnInit {
  customers: Customer[];
  customersForTable: CustomerViewModel[];
  newCustomers: Customer[];
  selectedCustomer: Customer;
  customerTypes: CustomerType[]; 
  generalInfoForm: FormGroup;
  showCustomersForm: boolean;
  forEdit: boolean;
  constructor(private customersService: CustomersService) {
     let customerType = new CustomerType();
     customerType.id = 1;
     customerType.title = "M";
     let customerType1 = new CustomerType();
     customerType1.id = 2;
     customerType1.title = "B";
     this.customerTypes = [];

     
    // this.customerTypes.push(customerType)
    // this.customerTypes.push(customerType1)
     
     this.showCustomersForm = false;
     this.newCustomers = [];
     this.customers = [];
     //this.customers.push(customer)
     this.forEdit = false;

  }

  ngOnInit() {
    let newThis = this;
    this.customersService.getAllCustomers().subscribe((result: CustomerViewModel[])=>{
        newThis.customersForTable = result;
       }, 
    (error)=>{});
   
      this.customersService.getCustomerTypes().subscribe((result:CustomerType[])=>{
       newThis.customerTypes = result;
      }, 
      (error)=>{});
   
  }
  deleteCustomer(customer:Customer){
    this.customers.splice(this.customers.findIndex(x=>x.id==customer.id), 1) 
    this.customersService.deleteCustomer(customer).subscribe((res)=>{}); 
  }
  openAddForm() {
    this.selectedCustomer = new Customer();
    this.selectedCustomer.departments = [];
    this.selectedCustomer.users = [];
    this.selectedCustomer.contacts = []; 
    this.showCustomersForm = true;
    this.forEdit = false;
  }
  editCustomer(customer: Customer) {

    
    this.customersService.getCustomer(customer.id).subscribe((res: Customer)=>{
      this.selectedCustomer = res;
      this.showCustomersForm = true;
      this.forEdit = true;
    })
   
  }
  onCustomerSave(newCustomer: Customer) {
    console.log(newCustomer)
    function selectObject(element: Customer) {
      return element.id == newCustomer.id
    }
    if (this.forEdit) {
      let index = this.customers.findIndex(selectObject)
      if (index != -1) {
        this.customers[index] = newCustomer;
      }

    }
    else {
      this.customers.push(newCustomer)
    }
    this.customersService.saveCustomer(newCustomer).subscribe((res)=>{


    });
    this.showCustomersForm = false;
  }

}

