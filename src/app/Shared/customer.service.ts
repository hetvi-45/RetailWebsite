import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'pdf-lib';
import { ReplaySubject, Subject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private idSource = new ReplaySubject<string>();
  id$ = this.idSource.asObservable();
  private orderidSource = new ReplaySubject<string>();
  orderid$ = this.orderidSource.asObservable();
  allCustomer: any;
  allCustomer1 : any;
  constructor(private http: HttpClient, private notifyService: NotificationService) { }

  addCustomer(cust: any){
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.post('http://localhost:3000/api/customer', cust, {headers}).toPromise().then((c:any) => {
      console.log(c);
      this.notifyService.showSuccess('Customer Added Successfully.')

    }).catch((error) => {
      console.log(error);
      this.notifyService.showError('Problem with the adding customer.')
    })
    
    // this.allCustomer = JSON.parse(localStorage.getItem("customer") || "[]");
    // console.log(cust);
    // var result = this.allCustomer.forEach((c : any) => c.email === cust.email);
    // if(result){
    //   console.log("customer already exists.");
    //   return false;
    // } else{
    //   this.allCustomer.push(cust);
    //   localStorage.setItem('customer', JSON.stringify(this.allCustomer));
    //   return true;
    // }
    
  }

  editCustomer(cust: any): any{
    console.log(cust);
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.patch(`http://localhost:3000/api/customer/${cust.id}`, cust, {headers}).toPromise().then((c:any)=> {
      console.log(c);
      this.notifyService.showSuccess('Customer Edited Successfully.')
      return c;
    }).catch((error) => {
      console.log(error);
      this.notifyService.showError('Error while editing customer detail, please try again later.')
      return error;
    })
    // this.allCustomer = JSON.parse(localStorage.getItem("customer") || "[]");
    // var result = this.allCustomer.find((c : any) => c.id === cust.id);
    // if(result){
    //   var index = this.allCustomer.findIndex((c : any) => c.id === cust.id);
    //   this.allCustomer.splice(index, 1);
    //   this.allCustomer.push(cust);
    //   localStorage.setItem('customer', JSON.stringify(this.allCustomer));
    //   return true;
    // } else {
    //   return false;
    // }
  }

  getCustomerById(id: string){
    let result;
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get(`http://localhost:3000/api/customer/${id}`, {headers}).toPromise().then((c: any) => {
      result = c;
      console.log(c);
      
    }).catch((error)=> {
      console.log(error);
      this.notifyService.showError('Problem to fetch customer with this id.')
    })
    // this.allCustomer = JSON.parse(localStorage.getItem("customer") || "[]");
    // var result = this.allCustomer.find((c: any) => c.id === id);
    return result;
  }
 
  sendId(id: string) {
    this.idSource.next(id);
  }

  sendOrderId(id: string){
    this.orderidSource.next(id);
  }
}
