import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {User, Department} from '../models/customer'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
 @Input() departments: Department[];
 @Input() users: User[];
 @Output() onUsersUpdate = new EventEmitter<User[]>();
 newUsers: User[];
  selectedUser: User;
  showUsersForm: boolean;
  
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
   // this.users = mockUsers;
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
    this.newUsers = [];
    this.showUsersForm = false;
    this.forEdit = false;


   }

  ngOnInit() {
  }
  openAddForm() {
    this.showUsersForm = true;
    this.forEdit = false;
  }
  deleteUser(user: User){
    this.users.splice(this.users.findIndex(x=>x.id==user.id), 1)
  }
  editUser(user: User) {

    this.showUsersForm = true;
    this.selectedUser = user;
    this.forEdit = true;
  }
  onUserSave(newUser: User) {
    console.log(newUser)
    function findUser(element: User) {
      return element.id == newUser.id
    }
    if (this.forEdit) {
      let index = this.users.findIndex(findUser)
      if (index != -1) {
        this.users[index] = newUser;
        this.newUsers.push(newUser)
      }

    }
    else {
      newUser.id = "";
      this.users.push(newUser)
      this.newUsers.push(newUser)
      
    }
    this.onUsersUpdate.emit(this.users)
    this.showUsersForm = false;
  }

}
