import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { ExistingCustomerComponent } from './existing-customer/existing-customer.component';
import { NewCustomerComponent } from "./new-customer/new-customer.component";

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


@NgModule({
  declarations: [
    CustomerComponent,
    ExistingCustomerComponent,
    NewCustomerComponent,
    EditCustomerComponent,
  
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  
})
export class CustomerModule { }
