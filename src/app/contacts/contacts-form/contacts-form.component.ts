import { Component, OnInit,  EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../../models/customer';
import { RandomGenerator } from '../../helpers/RandomGenerator';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit, OnChanges {
  @Input() contact: Contact;
  @Input() forEdit: boolean;
  @Output() onContactSave = new EventEmitter<Contact>();
  contactsForm: FormGroup;
  
  constructor() { 
    this.contactsForm = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'role': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      "email": new FormControl('', Validators.required)
    });
    

  }
  saveContact(){
    console.log(this.contactsForm.value)
    const formModel = this.contactsForm.value;
    let contactToSave: Contact = new Contact();
    contactToSave.email = formModel.email;
    contactToSave.name = formModel.name;
    contactToSave.role = formModel.role;
    contactToSave.phone = formModel.phone;
    contactToSave.id = null;

    if(this.forEdit){
      contactToSave.id = this.contact.id;
     
      
    }
    else{
      contactToSave.id = 0;
      
    }
    this.onContactSave.emit(contactToSave);
    this.contact = undefined;
    this.contactsForm.reset();
    
  }
  ngOnInit() {
  }
  ngOnChanges(){
    if(this.contact != undefined){
      this.contactsForm.setValue({
        name: this.contact.name,
        role: this.contact.role,
        phone: this.contact.phone,
        email: this.contact.email

      })
    }
}

}
