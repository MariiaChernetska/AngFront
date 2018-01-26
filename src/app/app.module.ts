import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

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
import { CustomerMainFormComponent } from './customers/customer-main-form/customer-main-form.component';
import { AdminCanActivateGuardService } from './models/can-activate-guard.service';
import { CanActivateIfNotAuthorizedService } from './models/can-activate-if-not-authorized.service';
import { TabsetComponent } from './tabset/tabset.component';

import { LoginService } from './login/login.service';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { CanActivateIfAuthorizedService } from './models/can-activate-if-authorized.service';
import { AuthInterceptor } from './models/interceptor';
import { TabComponent } from './tabset/tab.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      CanActivateIfNotAuthorizedService
   ]
    
  },
  {
    path: 'userpanel',
    component: UserPanelComponent,
    canActivate: [
      CanActivateIfAuthorizedService
   ]
    
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [
      AdminCanActivateGuardService
   ]
  },
  { path: '**', redirectTo:'/' }
  
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
    ContactsFormComponent,
    CustomerMainFormComponent,
    UserPanelComponent,
    TabComponent,
    TabsetComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    
    
  ],
  providers: [ 
    CookieService, 
    AdminCanActivateGuardService,
    CanActivateIfNotAuthorizedService, 
    CanActivateIfAuthorizedService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
