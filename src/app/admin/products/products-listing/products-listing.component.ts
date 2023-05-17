import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef,   } from "@angular/material/table";
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { NotificationService } from 'src/app/Shared/notification.service';
// const ELEMENT_DATA: any  = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.css']
})
export class ProductsListingComponent implements OnInit {
  @ViewChild('showModal') modal!: ElementRef<HTMLButtonElement>;
  displayedColumns: string[] = ['name', 'image', 'price', 'instock', 'edit/delete'];
  dataSource: any ;
  productelement: any;
  // @Output() newItemEvent = new EventEmitter<any>();
  constructor(private location: Location, private http: HttpClient, private notifyService: NotificationService) { }

  ngOnInit(): void {
    // this.dataSource = JSON.parse(localStorage.getItem('products') || '[]');
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get('http://localhost:3000/api/products/', {headers}).toPromise().then((p : any)=> {
      this.dataSource = p
      console.log(p);
    })
  }

  goBack(){
    this.location.back();
  }

  editProduct(element: any){
    this.productelement = element;
    console.log(this.productelement);
    
  }
  deleteProduct(index: any){
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.delete(`http://localhost:3000/api/products/${index}`, {headers}).toPromise().then((p:any) => {
      console.log(p);
      this.notifyService.showSuccess(p.message);
      this.http.get('http://localhost:3000/api/products/', {headers}).toPromise().then((prod: any)=> {
        this.dataSource = prod
      }).catch(error => console.log(error)
      )
      
    }).catch(error => {
      this.notifyService.showError('Could not delete product');
      console.log(error)
    })
    
  }

  closeModal() {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get('http://localhost:3000/api/products/', {headers}).toPromise().then((prod: any)=> {
        console.log(prod);
        
        this.dataSource = prod
      }).catch(error => console.log(error)
      )
    this.modal.nativeElement.click();
  }

}
