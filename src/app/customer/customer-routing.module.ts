import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { ExistingCustomerComponent } from "./existing-customer/existing-customer.component";
import { NewCustomerComponent } from "./new-customer/new-customer.component";
import { AuthGuard } from "../auth.guard";
import { EditCustomerComponent } from "./edit-customer/edit-customer.component";
// import { CustomerExistingComponent } from "./customer-page/customer-existing/customer-existing.component";
// import { CustomerNewComponent } from "./customer-page/customer-new/customer-new.component";
// import { CustomerPageComponent } from "./customer-page/customer-page.component";

const proroutes: Routes = [
  // {path: '', component:CustomerComponent}, 
  {path: '', children: [
  {path: 'new', component: NewCustomerComponent, canActivate: [AuthGuard] },
  {path : 'existing', component: ExistingCustomerComponent, canActivate: [AuthGuard]},
  {path: 'edit', component: EditCustomerComponent, canActivate: [AuthGuard]}
  // {path: '../customer/customer-page/new/:id', component: CustomerNewComponent}
  ]}
  ];
@NgModule({
    imports : [
        RouterModule.forChild(proroutes)
    ],
    exports : [
        RouterModule
    ]
})

export class CustomerRoutingModule {
  constructor(){
    console.log('customer routing Module loaded');   
  }
}