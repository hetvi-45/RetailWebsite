import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrderComponent } from './order/order.component';
import { IonButton, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListingComponent } from './products/products-listing/products-listing.component';
import { MatTableModule } from '@angular/material/table';
import { UserComponent } from './user/user.component'


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductsComponent,
    OrderComponent,
    ProductsListingComponent,
    UserComponent,
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule
  ],
})
export class AdminModule { }
