import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Shared/customer.service';
import { NotificationService } from 'src/app/Shared/notification.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() customer: any = {'name': '', 'email': '', 'phoneNo': '', 'address': '', 'birthDate': ''};
  result: any;
  currentDate: any;
  allCustomer: any;
  @Output() closeModalEvent = new EventEmitter<void>();
  
  constructor(private customerService: CustomerService, private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
    console.log("hello");
    
  }

  

  customerSubmit(form: NgForm){
    if(this.isEdit && this.customer){
      this.result = form.value;
      this.result['id'] = this.customer.id;
      // this.result['addedby'] = sessionStorage.getItem('saleid') || '';
      this.result['cart'] = this.customer['cart'];
      this.customerService.editCustomer(this.result);
        form.reset();
        this.closeModalEvent.emit();
      
      // this.router.navigate(['../', 'customer', 'existing']);

    }   else { 
    this.result = form.value;
    // this.currentDate = String(new Date()).split(" ")[2];
    this.result['cart'] = [];
    // var birthDate = this.result.birthDate.split("-")[2];
    // this.result['id'] = 'A' + this.currentDate + birthDate 
    // this.result['addedby'] = sessionStorage.getItem('saleid') || ''; 
    this.customerService.addCustomer(this.result);
    form.reset();
    }
  }

}
