import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CustomerService } from 'src/app/Shared/customer.service';
import { v4 as uuidv4 } from 'uuid';
import { loadStripe } from '@stripe/stripe-js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/Shared/notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'pdf-lib';
// declare var Stripe: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  @ViewChild('myTd', { static: true }) myTd!: ElementRef;
  // @ViewChild('cardElement') cardElement !: ElementRef<HTMLElement>;
  cardElement: any;
  isPayment: any = false
  id: any;
  currCustomer: any;
  subTotal: any;
  total: number = 0;
  htmlContent !: any;
  orderDetails: any;
  secret_key: any = 'sk_test_51MzxKnSEnuVPkBtQFSh1FUxNKLit64IogSfQhurakSUhTB1N3v86B3lvoKFk1sCqwzJhSgPyShlXDB0w9plIkZmy00pycHWDIM';
  publishable_key : any = 'pk_test_51MzxKnSEnuVPkBtQvUfsxIVckTc1EkidrOGk23D2bG5Rzdc1v7kTprXVtX2TXalkJeJPN30Q7kbPiZm4F4abCpfX00Hf6GcBl9';
  stripe!: any;
  paymentHandler !: any;
  // stripePromise = Stripe(this.publishable_key);
  // @Input() getCartDetail.quantity: any;
  private data = new Subject<string>();
  @Output() data$ = this.data.asObservable();
  constructor(private route:ActivatedRoute, private http: HttpClient, private customerService: CustomerService, 
    private router: Router, private location: Location,
    private notifyService: NotificationService) { 
    
    // this.currCustomer = JSON.parse(sessionStorage.getItem('currCustomer') || '{}');
  }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get(`http://localhost:3000/api/customer/${this.id}`, {headers}).toPromise().then((c: any) => {
      this.currCustomer = c;
      console.log(c);
      
      if(this.currCustomer['cart']){
  
        this.getTotal(this.currCustomer['cart']); 
      }
    }).catch((error)=> {
      console.log(error);
      
    })
    
    console.log(this.myTd);
    
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes['myTd'].currentValue);
    console.log("Hello..");
    
    console.log(changes);
    
    
  }
  
  ngAfterViewInit() {
    console.log("Hello");
  }

  getSubtotal(item: any): number {
    // console.log(item);
    
    return item.price * item.quantity;
  }

  getTotal(item: any){
    console.log(item);
    item.forEach((i: any) =>{ this.total = this.total + parseInt(i['price']) * i['quantity'];
      console.log(this.total);
  }
    );
    // return this.total
  }

  inc(id: any, quantity: any){
    // var allCust = JSON.parse(localStorage.getItem('customer') || '[]');
    var currProduct = this.currCustomer['cart'].find((p: any) => p.id === id);
    this.total = this.total - (currProduct['price'] * currProduct['quantity']);
    if(quantity != currProduct.count){
      currProduct.quantity = quantity + 1;
      this.subTotal = this.getSubtotal(currProduct);
      this.total = this.total + (currProduct['price'] * currProduct['quantity']);
      console.log(this.total);
      
    }
    // var result = allCust.findIndex((c: any) => c.id === this.id);
    // allCust.splice(result, 1);
    // allCust.push(this.currCustomer);
    // localStorage.setItem('customer', JSON.stringify(allCust));
  }

  dec(id: any, quantity: any){
    var allCust = JSON.parse(localStorage.getItem('customer') || '[]');
    var currProduct = this.currCustomer['cart'].find((p: any) => p.id === id);
    this.total = this.total - (currProduct['price'] * currProduct['quantity']);
    if(quantity != 1){
      currProduct.quantity = quantity - 1;
      this.subTotal = this.getSubtotal(currProduct); 
      this.total = this.total + (currProduct['price'] * currProduct['quantity']);
    }
    var result = allCust.findIndex((c: any) => c.id === this.id);
    allCust.splice(result, 1);
    allCust.push(this.currCustomer);
    localStorage.setItem('customer', JSON.stringify(allCust));
  }



  Todelete(index: any, cart: any){
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.patch(`http://localhost:3000/api/customer/deletecart/${this.id}`, cart, {headers}).toPromise().then((c:any)=>{
      this.currCustomer = c;
      this.notifyService.showSuccess('Cart item deleted successfully.');
    }).catch((error)=> {
      console.log(error);
      this.notifyService.showError('Problem to delete cart item.');
    })
    
  }

  goToProductList(id: any){
    // {queryParams: {id: id}}
    console.log(id);
    
    this.customerService.sendId(id);
    this.router.navigate(['../', 'product', 'productList']);
  }

  // goToReceipt(id: any){
  //   this.customerService.sendOrderId(id);
  // }

  onPayment() {
    // this.orderDetails = JSON.parse(localStorage.getItem('order') || '[]');
    // this.invokeStripe();
    // this.initializePayment(this.total)
      let newOrder;
      var order = {
        'custId': this.currCustomer.id,
        'name': this.currCustomer.name,
        'address': this.currCustomer.address,
        'email': this.currCustomer.email,
        'phoneNo': this.currCustomer.phoneNo,
        'date': (new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }),
        'orderedProduct': this.currCustomer['cart'],
        'total': this.total
      }
      const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);

      this.http.post('http://localhost:3000/api/customer/order', order, {headers}).toPromise().then((o: any) => {
        newOrder = o;
        this.customerService.sendOrderId(newOrder['id']);
        sessionStorage.setItem('orderid', newOrder['id']);
        sessionStorage.removeItem('onBasketScreen');
        sessionStorage.setItem('onReceiptScreen', 'true');
        this.notifyService.showSuccess('Payment Done Successfully.');
        this.router.navigate(['../', 'product', 'receipt']);
      }).catch((error) => {
        console.log(error);
        this.notifyService.showError('Problem with payment.')
      })
      //To Minus stock from how much quantity customer buyed .. will implement later.

      // let product = JSON.parse(localStorage.getItem('products') || '[]');
      // this.currCustomer['cart'].forEach((prod: any) => {
      //   product.forEach((p: any) => {
      //     if(p['id'] === prod['id']){
      //       // console.log(p);
      //       p['count'] -= prod['quantity'];
      //       console.log(p['count']);  
      //     }
      //   })
      // })
      // localStorage.removeItem('products');
      // localStorage.setItem('products', JSON.stringify(product));
      
      

      //To Empty the customer cart after Payment.
      // this.currCustomer['cart'].length = 0;
      // var allCust = JSON.parse(localStorage.getItem('customer') || '[]');
      // var result = allCust.findIndex((c: any) => c.id === this.id);
      // allCust.splice(result, 1);
      // allCust.push(this.currCustomer)
      // localStorage.setItem('customer', JSON.stringify(allCust));

  
    
    
   
  }

  goBack(){
    sessionStorage.setItem('onBasketScreen', 'false');
    this.location.back();

  }

  

async initializePayment(amount: any) {
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: this.publishable_key,
    locale: 'auto',
    token: async (stripeToken: any) => {
      console.log({stripeToken});
      // Call your backend API to process the payment and store the order
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });
      const data = {
        amount: parseInt(amount),
        token: stripeToken.id,
        customer: this.currCustomer.name
      };
      const response = await this.http.post('http://localhost:3000/api/checkout', data, { headers }).subscribe((response: any) => {
        return response;
      });
      console.log(response);
      
      
    }
  });

  paymentHandler.open({
    name: this.currCustomer.name,
    description: 'Thanks For Shopping with us!',
    amount: parseInt(amount) * 100
  });
}

  async invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.publishable_key,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }
  generatePDF() {
    // const doc = new jsPDF();
    // this.htmlContent = document.getElementById('download');
    // html2canvas(this.htmlContent).then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgProps = doc.getImageProperties(imgData);
    //   const pdfWidth = doc.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   doc.save('my-pdf.pdf');
    // });
  }

}


