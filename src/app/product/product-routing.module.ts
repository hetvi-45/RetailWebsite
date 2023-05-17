import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasketComponent } from "./basket/basket.component";
import { ProductComponent } from "./product.component";
import { ReceiptComponent } from "./receipt/receipt.component";
import { AuthGuard } from "../auth.guard";

const proroutes: Routes = [
  {path: 'productList', component:ProductComponent, canActivate: [AuthGuard]}, 
  {path: 'basket/:id', component: BasketComponent, canActivate: [AuthGuard] },
  {path: 'basket', component: BasketComponent, canActivate: [AuthGuard]},
  {path: 'receipt', component: ReceiptComponent, canActivate: [AuthGuard]}
  // {path: '../customer/customer-page/new/:id', component: CustomerNewComponent}

  ];
@NgModule({
    imports : [
        RouterModule.forChild(proroutes)
    ],
    exports : [
        RouterModule
    ]
})

export class ProductRoutingModule {
  constructor(){
    console.log('product routing Module loaded');   
  }
}