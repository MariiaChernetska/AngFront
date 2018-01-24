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
     customer.id = RandomGenerator.generateRandomString(5);
     customer.name = "Customer1";
     customer.address = "sfdgh";
     customer.email = "svfv";
     customer.phone = "2345";
     customer.comments = "";
     customer.numberOfSchools = 2;
     customer.type = customerType;
     customer.contacts = [
      {
        id:RandomGenerator.generateRandomString(5),
        name: "Contact1",
        phone: "12345",
        email: "edfghj",
        role: "Role1"
      }
     ]
     customer.departments = [
       {
      
          id: RandomGenerator.generateRandomString(5),
          name: "name1",
          manager: {
            id: "3",
            name: "User3",
            mobile: "123456",
            email: "swfe",
            username: "hdjcndjc",
            password: "fvgbhnj"
          },
          address: "address1"
      
       }
     ]
     customer.users = [
       {
        id: "3",
        name: "User3",
        mobile: "123456",
        email: "swfe",
        username: "hdjcndjc",
        password: "fvgbhnj"
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
   
      //  this.customersService.getCustomerTypes().subscribe((result:CustomerType[])=>{
      //   newThis.customerTypes = result;
      //  }, 
      //  (error)=>{});
   
  }
  openAddForm() {
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
    this.showCustomersForm = false;
  }

}

