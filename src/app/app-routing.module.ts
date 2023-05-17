import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'customer',
    loadChildren: () => import('./customer/customer-routing.module').then(x => x.CustomerRoutingModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(x => x.AdminRoutingModule)},
  { path: 'product', loadChildren: () => import('./product/product-routing.module').then(x => x.ProductRoutingModule)},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
