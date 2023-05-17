import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/Shared/notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() isEdit: boolean = true;
  // @Input() onEdit!: Function;
  @Input() currProduct: any;
  @Output() closeModalEvent = new EventEmitter<any>();
  result !: any;
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    count: new FormControl(0, Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
  product: Product[] = [];
  currentProduct: any;
  // currentProduct: Product = new Product('', '', 0, '');
  constructor(private router: Router, private location: Location, private http: HttpClient, private notifyService: NotificationService) {

  }

  ngOnInit(): void {
    // console.log(this.currProduct);
  }

  ngAfterViewInit() {
    console.log(this.currProduct);

  }

  productSubmit() {
    if (!this.isEdit) {
      const token = sessionStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', token);
      this.http.patch(`http://localhost:3000/api/products/${this.currProduct.id}`,this.productForm.value, {headers}).toPromise()
        .then((p:any)=> {
          console.log(p);
          this.notifyService.showSuccess('Product Edited Successfully.')
        }).catch(error => {
          console.log(error)
          this.notifyService.showError('Problem to edit product.');
        });
      
      this.productForm.reset();
      this.closeModalEvent.emit();
      // this.goToProductList();

    } else {
      let cu = this.productForm.value
      this.currentProduct = {
        'name': cu.name,
        'price': cu.price,
        'count': cu.count,
        'description': cu.description,
        'quantity': 1,
        'imageUrl': cu.image
      };
      const token = sessionStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', token);
      this.http.post('http://localhost:3000/api/products/', this.currentProduct, {headers}).toPromise().then((p : any)=>{
        console.log(p);
        
        this.notifyService.showSuccess('Product Added Successfully.')
      }).catch(error => {
        console.log(error)
        this.notifyService.showError('Problem to add product, check again later.')
      });
      this.productForm.reset();

    }
  }

  goBack() {
    this.location.back();
  }

  editProduct(e: any) {
    console.log(e);

  }

  goToProductList() {
    this.router.navigate(['../', 'admin', 'product-list']);
  }
}
