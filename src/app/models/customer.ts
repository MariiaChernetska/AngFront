export class CustomerGeneral{
    id:string;
    name: string;
    address: string;
    email: string;
    phone: string;
    comments: string;
    type: CustomerType;
    numberOfSchools?: number; 
    
  }
export class Customer extends CustomerGeneral{
    contacts: Contact[];
    users: User[];
    departments: Department[];
  }
 export class Contact{
    id:string;
    name: string;
    role: string;
    phone: string;
    email: string;
  }
  export class User {
    id: string;
    name: string;
    mobile: string;
    email: string;
    department?: Department;
    username: string;
    password: string;
  }
  export class CustomerType{
    id:number;
    title: string;
  }
  export class Department{
    id: string;
    name:string;
    address: string;
    manager: User;
  }