import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CustomersComponent } from './customers/customers.component';
import { DepartmentsComponent } from './departments/departments.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { DepartmentsFormComponent } from './departments/departments-form/departments-form.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsFormComponent } from './contacts/contacts-form/contacts-form.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomersComponent,
    DepartmentsComponent,
    UsersComponent,
    UsersFormComponent,
    DepartmentsFormComponent,
    ContactsComponent,
    ContactsFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
