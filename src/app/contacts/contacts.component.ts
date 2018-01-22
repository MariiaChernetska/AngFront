import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/customer';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  newContacts: Contact[];
  selectedContact: Contact;
  showContactsForm: boolean;
  forEdit: boolean;
  constructor() {
    let mockContacts = [
      {
        id:1,
        name: "Contact1",
        phone: "12345",
        email: "edfghj",
        role: "Role1"
      },
      {
        id:2,
        name: "Contact2",
        phone: "54321",
        email: "dcfvkhjn",
        role: "Role2"
      }
    ]
    this.contacts = mockContacts;
    this.newContacts = [];
    this.showContactsForm = false;
    this.forEdit = false;
  }

  ngOnInit() {
  }
  openAddForm(){
      this.showContactsForm = true;
      this.forEdit = false;
  }
  editContact(contact: Contact){
   
    this.showContactsForm = true;
    this.selectedContact = contact;
    this.forEdit = true;
  }
  onContactSave(newContact: Contact){
    console.log(newContact)
    function selectObject(element:Contact){
        return element.id == newContact.id
    }
      if(this.forEdit){
        let index = this.contacts.findIndex(selectObject)
        if(index!=-1){
            this.contacts[index] = newContact;
        }
        
      }
      else{
        this.contacts.push(newContact)
      }
  }

}
