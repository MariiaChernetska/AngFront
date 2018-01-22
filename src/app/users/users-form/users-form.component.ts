import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department, User } from '../../models/customer';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  userForm: FormGroup;
  departmentsForm: FormGroup;
  
    @Input() user: User;
    @Input() departments: Department[];
    @Input() forEdit: boolean;
    @Output() onUserSave = new EventEmitter<User>();
  constructor() {
    this.departments = [];
  
    this.userForm = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'phone': new FormControl('', Validators.required),
      'email': new FormControl('',[Validators.required]),
      'username': new FormControl(''),
      'password': new FormControl('',[Validators.required]),
      'department': new FormControl(''),

    });
  }

  ngOnInit() {
  }
  saveUser(){
    console.log(this.userForm.value)
    const formModel = this.userForm.value;
    function findDepartment(dep:Department){
      return dep.id == formModel.department;
    }
    let userToSave: User = new User();

    userToSave.name = formModel.name;
    userToSave.mobile = formModel.phone;
    userToSave.email = formModel.email;
    userToSave.username = formModel.username;
    userToSave.password = formModel.password;
    userToSave.department = this.departments.find(findDepartment);
    userToSave.id = null;

    if(this.forEdit){
      userToSave.id = this.user.id;
    }
    this.onUserSave.emit(userToSave);
    this.user = undefined;
    this.userForm.reset();
    
  }
  ngOnChanges(){
    if(this.user != undefined){
      this.userForm.setValue({
        name: this.user.name,
        phone: this.user.mobile,
        email: this.user.email,
        username: this.user.username,
        password: this.user.password,
        department: this.user.department.id

      })
    }
}

}
