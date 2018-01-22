import { Component, OnInit, EventEmitter, Input, Output, OnChanges  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, Department } from '../../models/customer';

@Component({
  selector: 'app-departments-form',
  templateUrl: './departments-form.component.html',
  styleUrls: ['./departments-form.component.css']
})
export class DepartmentsFormComponent implements OnInit {
  departmentsForm: FormGroup;

  @Input() department: Department;
  @Input() users: User[];
  @Input() forEdit: boolean;
  @Output() onDepartmentSave = new EventEmitter<Department>();
  constructor() {

    this.departmentsForm = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'address': new FormControl('', Validators.required),
      'manager': new FormControl('', Validators.required)
    });
    
   }

  ngOnInit() {
  }
  saveDepartment(){
    console.log(this.departmentsForm.value)
    const formModel = this.departmentsForm.value;
    function findManager(manager:User){
      return manager.id == formModel.manager;
    }
    let depToSave: Department = new Department();

    depToSave.name = formModel.name;
    depToSave.address = formModel.address;
    depToSave.manager = this.users.find(findManager);
    depToSave.id = null;

    if(this.forEdit){
      depToSave.id = this.department.id;
    }
    this.onDepartmentSave.emit(depToSave);
    this.department = undefined;
    this.departmentsForm.reset();
    
  }
  ngOnChanges(){
    if(this.department != undefined){
      this.departmentsForm.setValue({
        name: this.department.name,
        address: this.department.address,
        manager: this.department.manager.id

      })
    }
}

}
