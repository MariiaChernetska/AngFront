import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department, User } from '../models/customer';
import { RandomGenerator } from '../helpers/RandomGenerator';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  @Input() departments: Department[];
  @Input() users: User[];
  @Output() onDepartmentsUpdate = new EventEmitter<Department[]>();
  
  newDepartments: Department[];
  selectedDepartment: Department;
  showDepartmentsForm: boolean;
  forEdit: boolean;
  constructor() {
    // let mockUsers = [
    //   {
    //     id: "1",
    //     name: "User1",
    //     mobile: "123456",
    //     email: "swfe",
    //     username: "hdjcndjc",
    //     password: "fvgbhnj"
    //   },
    //   {
    //     id: "2",
    //     name: "User2",
    //     mobile: "123456",
    //     email: "swfe",
    //     username: "hdjcndjc",
    //     password: "fvgbhnj"
    //   },
    //   {
    //     id: "3",
    //     name: "User3",
    //     mobile: "123456",
    //     email: "swfe",
    //     username: "hdjcndjc",
    //     password: "fvgbhnj"
    //   },

    // ]
    //this.users = mockUsers;
    // let mockDepartments: Department[] = [
    //   {
    //     id: 1,
    //     name: "name1",
    //     manager: this.users[0],
    //     address: "address1"
    //   },
    //   {
    //     id: 2,
    //     name: "name2",
    //     manager: this.users[1],
    //     address: "address2"
    //   }
    // ]

    //this.departments = mockDepartments;
    
    this.newDepartments = [];
    this.showDepartmentsForm = false;
    this.forEdit = false;
  }

  ngOnInit() {
  }
  openAddForm() {
    this.showDepartmentsForm = true;
    this.forEdit = false;
  }
  editDepartment(dep: Department) {

    this.showDepartmentsForm = true;
    this.selectedDepartment = dep;
    this.forEdit = true;
  }
  onDepartmentSave(newDepartment: Department) {
    console.log(newDepartment)
    function selectObject(element: Department) {
      return element.id == newDepartment.id
    }
    if (this.forEdit) {
      let index = this.departments.findIndex(selectObject)
      if (index != -1) {
        this.departments[index] = newDepartment;
        this.newDepartments.push(newDepartment)
      }

    }
    else {
      newDepartment.id = RandomGenerator.generateRandomString(5);
      
      this.departments.push(newDepartment)
      this.newDepartments.push(newDepartment)
    }
    this.onDepartmentsUpdate.emit(this.departments)
    this.showDepartmentsForm = false;
  }

}
