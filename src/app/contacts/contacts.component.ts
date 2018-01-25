import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../models/customer';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() contacts: Contact[];
  newContacts: Contact[];
  selectedContact: Contact;
  showContactsForm: boolean;
  forEdit: boolean;
  constructor() {

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
            this.newContacts.push(newContact)
        }
        
      }
      else{
        this.contacts.push(newContact)
        this.newContacts.push(newContact)
        
      }
      this.showContactsForm = false;
      
  }
  
}
