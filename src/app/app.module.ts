import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { CustomerModule } from './customer/customer.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomerRoutingModule } from './customer/customer-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminModule } from './admin/admin.module';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProductModule } from './product/product.module';
import { ProductRoutingModule } from './product/product-routing.module';
import { AuthGuard } from './auth.guard';
import { ToastrModule, ToastrService, ToastNoAnimationModule } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerRoutingModule,
    AdminRoutingModule,
    IonicModule.forRoot(),
    CustomerModule,
    AdminModule,
    ProductModule,
    ProductRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    ToastrModule.forRoot({
      timeOut: 300,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    }),
    
    
  ],
  providers: [AuthGuard, ToastrService, MatSnackBar],
  bootstrap: [AppComponent],

  exports:[IonicModule, HeaderComponent]
})
export class AppModule { }
