import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrderComponent } from "./order/order.component";
import { ProductsListingComponent } from "./products/products-listing/products-listing.component";
import { ProductsComponent } from "./products/products.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "../auth.guard";

const proroutes: Routes = [
  {path: '', children:[
    {path: '', component: AdminComponent, canActivate: [AuthGuard]},
  { path : 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  {path:'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'product-list', component: ProductsListingComponent, canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]}
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

export class AdminRoutingModule {
  constructor(){
    console.log('Admin Module loaded');   
  }
}