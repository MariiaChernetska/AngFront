import { Component, OnInit } from '@angular/core';
import {CustomersService} from './customers.service'
import {Customer, CustomerGeneral, CustomerType} from '../models/customer' 
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

     let customer = new Customer()
     customer.id =  0;
     customer.name = "TestCustomer";
     customer.address = "Test Address";
     customer.email = "email@email.com";
     customer.phone= "123456";
     customer.comments = "Some comment";
     customer.numberOfSchools = 10;
     customer.type =  2,
     customer.contacts = [
      {
          id: 0,
          name: "Contact1",
          role: "Cool boy",
          phone: "123456",
          email: "email@email.com"
        
      }
     ]
     customer.departments = [
       {
          id: 0,
          name: "First1",
          address: "FirstAddress1",
          managerLogin: "vasya"
       }
     ]
     customer.users = [
       {
        
          "id": null,
          "name": "Vasya",
          "mobile": "123456",
          "email": "vasya@email.com",
          "departmentName": "First1",
          "userName": "vasya",
          "password": "P@ssw0rd"
        
       }
     ]
    this.customerTypes.push(customerType)
    this.customerTypes.push(customerType1)
     
     this.showCustomersForm = false;
     this.newCustomers = [];
     this.customers = [];
     this.customers.push(customer)
     this.forEdit = false;

  }

  ngOnInit() {
    let newThis = this;
    // this.customersService.getAllCustomers().subscribe((result:CustomerGeneral[])=>{
    //     newThis.customers = result;
    //    }, 
    //    (error)=>{});
   
      this.customersService.getCustomerTypes().subscribe((result:CustomerType[])=>{
       newThis.customerTypes = result;
      }, 
      (error)=>{});
   
  }
  deleteCustomer(customer:Customer){
    this.customers.splice(this.customers.findIndex(x=>x.id==customer.id), 1)  
  }
  openAddForm() {
    this.selectedCustomer = new Customer();
    this.showCustomersForm = true;
    this.forEdit = false;
  }
  editCustomer(customer: Customer) {

    this.showCustomersForm = true;
    this.selectedCustomer = customer;
    this.forEdit = true;
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

