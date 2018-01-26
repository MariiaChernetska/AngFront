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
  @Output() onDepartmentUsersDelete = new EventEmitter<User[]>();
  
  newDepartments: Department[];
  selectedDepartment: Department;
  showDepartmentsForm: boolean;
  forEdit: boolean;
  constructor() {
    
    
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
  deleteDepartment(dep: Department){
    this.departments.splice(this.departments.findIndex(x=>x.id==dep.id), 1);
    for(let i =0; i<this.users.length;i++){
        if(this.users[i].departmentName==dep.name){
          this.users.splice(i, 1);
        }
    }
    this.onDepartmentUsersDelete.emit(this.users);

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
      newDepartment.id = 0;
      
      this.departments.push(newDepartment)
      this.newDepartments.push(newDepartment)
    }
    this.onDepartmentsUpdate.emit(this.departments)
    this.showDepartmentsForm = false;
  }

}
