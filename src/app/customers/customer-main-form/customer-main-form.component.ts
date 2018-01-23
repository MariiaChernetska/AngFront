import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Customer, CustomerGeneral, CustomerType } from '../../models/customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentsComponent } from '../../departments/departments.component';
import { UsersComponent } from '../../users/users.component';
import { ContactsComponent } from '../../contacts/contacts.component';

@Component({
  selector: 'app-customer-main-form',
  templateUrl: './customer-main-form.component.html',
  styleUrls: ['./customer-main-form.component.css']
})
export class CustomerMainFormComponent implements OnInit {
  customers: Customer[];
  generalInfoForm: FormGroup;
  @ViewChild(DepartmentsComponent)
  private departmentsComponent: DepartmentsComponent;

  @ViewChild(UsersComponent)
  private usersComponent: UsersComponent;

  @ViewChild(ContactsComponent)
  private contactsComponent: ContactsComponent;

  @Input() customer: Customer;
  @Input() customerTypes: CustomerType[];   
  @Input() forEdit: boolean;
  @Output() onCustomerSave = new EventEmitter<Customer>();
  constructor() { 

    this.generalInfoForm = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'phone': new FormControl('', Validators.required),
      'address': new FormControl('',[Validators.required]),
      'comment': new FormControl(''),
      'email': new FormControl('',[Validators.required]),
      'type': new FormControl('', Validators.required),
      'numberOfSchools': new FormControl('', Validators.required),

    });
  }

  ngOnInit() {
  }
  saveCustomer(){
    console.log(this.generalInfoForm.value)
    const formModel = this.generalInfoForm.value;
    
    let customerToSave: Customer = new Customer();

    customerToSave.name = formModel.name;
    customerToSave.address = formModel.address;
    customerToSave.email = formModel.email;
    customerToSave.phone = formModel.phone;
    customerToSave.type = <string>formModel.type;
    customerToSave.comments = formModel.comments;
    customerToSave.numberOfSchools = formModel.numberOfSchools;
    customerToSave.id = null;
    customerToSave.contacts = this.contactsComponent.newContacts;
    customerToSave.users = this.usersComponent.newUsers;
    customerToSave.departments = this.departmentsComponent.newDepartments;

    if(this.forEdit){
      customerToSave.id = this.customer.id;
    }
    this.onCustomerSave.emit(customerToSave);
    this.customer = undefined;
    this.generalInfoForm.reset();
    
  }
  ngOnChanges(){
    if(this.customer != undefined){
      this.generalInfoForm.setValue({
        name: this.customer.name,
        address: this.customer.address,
        email: this.customer.email,
        phone: this.customer.phone,
        type:<string>this.customer.type,
        comment: this.customer.comments,
        numberOfSchools: this.customer.numberOfSchools,

      })
    }
}

}
