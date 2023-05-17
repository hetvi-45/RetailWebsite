import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { BasketComponent } from './basket/basket.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ProductComponent,
    BasketComponent,
    ReceiptComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class ProductModule { }
