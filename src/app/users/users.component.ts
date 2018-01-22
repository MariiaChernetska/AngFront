import { Component, OnInit } from '@angular/core';
import {User, Department} from '../models/customer'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  departments: Department[];
  users: User[];
  newUsers: User[];
  selectedUser: User;
  showUsersForm: boolean;
  forEdit: boolean;
  constructor() {
    let mockUsers = [
      {
        id: "1",
        name: "User1",
        mobile: "123456",
        email: "swfe",
        username: "hdjcndjc",
        password: "fvgbhnj"
      },
      {
        id: "2",
        name: "User2",
        mobile: "123456",
        email: "swfe",
        username: "hdjcndjc",
        password: "fvgbhnj"
      },
      {
        id: "3",
        name: "User3",
        mobile: "123456",
        email: "swfe",
        username: "hdjcndjc",
        password: "fvgbhnj"
      },

    ]
    this.users = mockUsers;
    let mockDepartments: Department[] = [
      {
        id: 1,
        name: "name1",
        manager: this.users[0],
        address: "address1"
      },
      {
        id: 2,
        name: "name2",
        manager: this.users[1],
        address: "address2"
      }
    ]

    this.departments = mockDepartments;
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
      }

    }
    else {
      this.users.push(newUser)
    }
    this.showUsersForm = false;
  }

}