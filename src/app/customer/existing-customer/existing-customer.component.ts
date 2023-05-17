import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'pdf-lib';

@Component({
  selector: 'app-existing-customer',
  templateUrl: './existing-customer.component.html',
  styleUrls: ['./existing-customer.component.css']
})
export class ExistingCustomerComponent implements OnInit {
  @ViewChild('showModal') modal!: ElementRef<HTMLButtonElement>;

  
  arr: any;
  customer: any;
  
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get('http://localhost:3000/api/customer/', {headers}).toPromise().then((c: any) => {
      this.arr = c;
    }).catch((error) => {
      console.log(error);
      
    })
    // this.arr = JSON.parse(localStorage.getItem('customer') || '[]');
    // this.arr = this.arr.filter((a: any) => a['addedby'] === sessionStorage.getItem('saleid') || '');
  }

  

  closeModal() {
    this.modal.nativeElement.click();
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get('http://localhost:3000/api/customer/', {headers}).toPromise().then((c: any) => {
      this.arr = c;
    }).catch((error) => {
      console.log(error);
      
    })
    // this.arr = JSON.parse(localStorage.getItem('customer') || '[]');
  }

  goToProductSection(customer: any) {
    console.log(customer);
    var id = customer.id
    sessionStorage.setItem('onBasketScreen', 'true');
    sessionStorage.setItem('customerid', JSON.stringify(customer.id));
    this.router.navigate(['../', 'product', 'basket', id]);
  }

  edit(customer: any){  
    this.customer = customer;
    
    
  }

}
