import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { error } from 'pdf-lib';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NotificationService } from 'src/app/Shared/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  allOrder: any;
  private overlayRef: OverlayRef | null = null;
  @ViewChild('productDetailTemplate', { static: true }) productDetailTemplate!: TemplateRef<any>;

  constructor(private http: HttpClient, private overlay: Overlay, private elementRef: ElementRef,
    private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef, 
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get('http://localhost:3000/api/customer/order', {headers}).toPromise().then((o: any)=> {
      this.allOrder = o;
      
    }).catch(error => {
      console.log(error);
      
    })
    // this.allOrder = JSON.parse(localStorage.getItem('order') || '[]');
  }

  deleteOrder(order: any){
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.delete(`http://localhost:3000/api/customer/order/${order.id}`, {headers}).toPromise().then((o: any)=> {
      console.log(o);
      this.notifyService.showSuccess(o.message);
      this.http.get('http://localhost:3000/api/customer/order/', {headers}).toPromise().then((o: any)=> {
      this.allOrder = o;
    }).catch(error => {
      console.log(error);
      
    })
      
    }).catch(error => {
      console.log(error);
      this.notifyService.showError('Could not delete order');
    })
  }

  view(){
    // Initialize the overlay configuration
    const config: OverlayConfig = {
      hasBackdrop: true, // Display a backdrop behind the overlay
      backdropClass: 'overlay-backdrop', // CSS class for the backdrop
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    };

    // Create the overlay
    this.overlayRef = this.overlay.create(config);

    if (this.overlayRef) {
      // const productDetailFactory = this.resolver.resolveComponentFactory();
      // const productDetailComponentRef = productDetailFactory.create(this.viewContainerRef.injector);
  
      // this.overlayRef.attach(productDetailComponentRef.hostView);
    }
  }

  closeOverlay(): void {
    // Detach and dispose of the overlay when closing
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  }

}
