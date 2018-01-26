import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Customer, CustomerGeneral, CustomerType, User, Department } from '../../models/customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentsComponent } from '../../departments/departments.component';
import { UsersComponent } from '../../users/users.component';
import { ContactsComponent } from '../../contacts/contacts.component';
import { TabsetComponent  } from '../../tabset/tabset.component';
import { TabComponent  } from '../../tabset/tab.component';

@Component({
  selector: 'app-customer-main-form',
  templateUrl: './customer-main-form.component.html',
  styleUrls: ['./customer-main-form.component.css'],
})
export class CustomerMainFormComponent implements OnInit {
  customers: Customer[];
  generalInfoForm: FormGroup;
  showNumInputWindow:boolean;
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
      'numberOfSchools': new FormControl(''),

    });
    this.showNumInputWindow = false;
    this.onChange = this.onChange.bind(this);
  }

  ngOnInit() {
  }
  onChange(val){
      if(val==1){
        this.showNumInputWindow = true;
      }
      else{
        this.showNumInputWindow = false;
        
      }
  }
  saveCustomer(){
    console.log(this.generalInfoForm.value)
    const formModel = this.generalInfoForm.value;
    function findType(type:CustomerType){
      return type.id == formModel.type;
    }
    let customerToSave: Customer = new Customer();

    customerToSave.name = formModel.name;
    customerToSave.address = formModel.address;
    customerToSave.email = formModel.email;
    customerToSave.phone = formModel.phone;
    customerToSave.type = formModel.type;
    customerToSave.comments = formModel.comment;
    if(customerToSave.type == 2){
      customerToSave.numberOfSchools = null;
    }
    else{
      customerToSave.numberOfSchools = formModel.numberOfSchools;      
    }
   
    customerToSave.contacts = this.contactsComponent.contacts;
    customerToSave.users = this.usersComponent.users;
    customerToSave.departments = this.departmentsComponent.departments;
    if(this.forEdit){
      customerToSave.id = this.customer.id;
      
      
    }
    else{
      customerToSave.id = 0;
      
    }
    this.onCustomerSave.emit(customerToSave);
    this.customer = undefined;
    this.generalInfoForm.reset();
    
  }
  onUpdateUsers(users: User[]){
    let bufCustomer = this.customer;
    bufCustomer.users = users;
    this.customer = bufCustomer;
  }
  onUpdateDepartments(deps: Department[]){
    let bufCustomer = this.customer;
    bufCustomer.departments = deps;
    this.customer = bufCustomer;
  }

  ngOnChanges(){ 
    if(this.customer != undefined && this.customer.name!="" && this.customer.name!=null){
      if(this.customer.type==1){
        this.showNumInputWindow = true;
      }
      this.generalInfoForm.setValue({
        name: this.customer.name,
        address: this.customer.address,
        email: this.customer.email,
        phone: this.customer.phone,
        type:this.customer.type,
        comment: this.customer.comments,
        numberOfSchools: this.customer.numberOfSchools,

      })
    }
}

}
