import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { CustomerService } from '../Shared/customer.service';
import { Location } from '@angular/common';
import { NotificationService } from '../Shared/notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'pdf-lib';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('child') child!: BasketComponent;
  @ViewChild('searchInput') search!: ElementRef;
  availProducts: any;
  _availProducts: any;
  message: any;
  product: boolean = true;
  currCustomer: any;
  id!: string;
  constructor(private route: ActivatedRoute,private router:Router, 
    private customerService: CustomerService, private location: Location,
    private notifyService: NotificationService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.availProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get('http://localhost:3000/api/products/', {headers}).toPromise().then((p: any) => {
      this.availProducts = p
    }).catch((error) => {
      console.log(error);
      
    });
    this._availProducts = this.availProducts;

    this.customerService.id$.subscribe(id => {
      this.id = id
    });
    // console.log(this.id);  
  }

  goBack(){
    this.location.back();
  }
  
  addToCart(product: any){
    console.log(product);
    if(product['count'] === 0){
      this.notifyService.showError("You Can't add this product in cart");
    } else {
      const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
      this.http.patch(`http://localhost:3000/api/customer/addtocart/${this.id}`, product, {headers}).toPromise().then((c:any)=> {
        console.log(c);
        this.currCustomer = c;
      }).catch((error) => console.log(error));
    //   var allCust = JSON.parse(localStorage.getItem('customer') || '[]');
    //   var currCust = allCust.find((c: any) => c.id == this.id);
    // var index = allCust.findIndex((c: any) => c.id == this.id);
    // allCust.splice(index, 1);
    // if(currCust['cart']){
    //   var result = currCust['cart'].find((cart: any) => cart.id === product.id);
    // }
    // if(result){
    //   console.log("product already exists");
    //   this.notifyService.showWarning('Product Already Exists In the Cart');
    // } else {
    //   currCust['cart'].push(product);
    //   localStorage.removeItem('customer');
    //   allCust.push(currCust);
    //   localStorage.setItem('customer', JSON.stringify(allCust));
    //   this.notifyService.showSuccess('Products Added in the cart Sucessfully.')
    // }   
  }
}
  
  inc(product: any){
    if(product.quantity !== product.count){
      product.quantity += 1;
    }
  }

  dec(product: any){
    if(product.quantity !== 1){
      product.quantity -= 1;
    }
  }

  onChange(){
    // console.log(this.search.nativeElement.value);
    const searchInput = this.search.nativeElement.value ? this.search.nativeElement.value.toLowerCase() : '';
    this.availProducts = this._availProducts.filter((u : any) => {
      const name: string = u.name.toLowerCase();
      return name.indexOf(searchInput) > -1;
    });
  }

  goToBasket(){
    this.location.back();
  }

}
