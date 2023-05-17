import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orderLength: any;
  productLength: any;
  userLength: any;
  totalSales: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get('http://localhost:3000/api/customer/order/', {headers}).toPromise().then((o:any)=> {
      this.orderLength = o.length
      o.forEach((o: any) => this.totalSales += o.total);
    }).catch(error => {
      console.log(error);
    })
    this.http.get('http://localhost:3000/api/products/', {headers}).toPromise().then((p:any)=> {
      this.productLength = p.length
    }).catch(error => {
      console.log(error);
    })
    this.http.get('http://localhost:3000/api/users/', {headers}).toPromise().then((u:any)=> {
      this.userLength = u.length
    }).catch(error => {
      console.log(error);
    })
  }

}
