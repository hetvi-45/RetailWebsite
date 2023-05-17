import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  public islogin!: string;
  public isadmin!: string ;
  isBasketScreen!: string;
  product: boolean = false;
  customerid: any;
  cartLength: number = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.customerid = sessionStorage.getItem('customerid') || ' ';
  }

  checkLogin(){
    this.islogin = sessionStorage.getItem('isLogin') || 'false';
    return this.islogin;
  }
  checkAdmin(){
    this.isadmin = sessionStorage.getItem('isAdmin') || 'false';
    return this.isadmin;
  }
  checkBasketScreen(){
    this.isBasketScreen = sessionStorage.getItem('onBasketScreen') || 'false';
    return this.isBasketScreen;
  }
  goto(){
    this.router.navigate(['../../', 'product', 'basket', this.customerid]);
  }

  checkCustomerId(){
    this.customerid = JSON.parse(sessionStorage.getItem('customerid') || ' ');
    if(this.customerid !== ' '){
      var allCustomer = JSON.parse(localStorage.getItem('customer') || '[]');
      var curr = allCustomer.find((c: any) => {
        return c['id'] == this.customerid
      });
      if(curr !== undefined){

        this.cartLength = curr['cart'].length;
      }
    } 
 
    return this.cartLength;
  }

  logOut(){
    sessionStorage.removeItem('isLogin');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.clear();
    const extras: NavigationExtras = { replaceUrl: true };
    this.router.navigate(['/'], extras);
  }

  ngOnDestroy(): void {
    this.logOut();
  }

}
