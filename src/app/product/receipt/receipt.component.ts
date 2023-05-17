import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Shared/customer.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import  html2pdf from 'html2pdf.js';
import { PDFDocument, error } from 'pdf-lib';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import html2pdf from 'html2pdf.js';
import { NotificationService } from 'src/app/Shared/notification.service';
// declare module html2pdf {};
declare var btoa: any;
declare var atob: any;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  orderid!: any;
  orderDetail: any;
  total: any = 0;
  htmlContent: any;
  retailSMTPKey: any = 'xsmtpsib-381d37f7787641d0ac33ad6bb4d3128462ef7c961eb96bb595dca778ecb9e76f-EdMfksj5091aIzXq';
  retailApiKey: any = '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';
  pdfMake!: any;
  reader!: any;
  pdfData: any;

  constructor(private customerService: CustomerService, private router: Router, private http: HttpClient, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.customerService.orderid$.subscribe(id => {
      this.orderid = id
    });
    // this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.orderid = sessionStorage.getItem('orderid');
    console.log(this.orderid);
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get(`http://localhost:3000/api/customer/order/${this.orderid}`, {headers}).toPromise().then((o:any) => {
      this.orderDetail = o
    }).catch(error => {
      console.log(error);
      
    })
  }

  goToHomePage() {
    sessionStorage.removeItem('orderid');
    sessionStorage.removeItem('onBasketScreen');
    this.router.navigate(['/', 'customer', 'new']);
  }

  sendEmail() {
    this.htmlContent = document.getElementById('download');
    html2canvas(this.htmlContent).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      const pdfContent = pdf.output('arraybuffer');
      const base64Content = btoa(
        new Uint8Array(pdfContent)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      const formData = {
        to: [{ email: 'hetviparikh29@gmail.com' }],
        subject: 'PDF Report',
        htmlContent: 'Please find attached the PDF report.',
        sender: { name: 'Hetvi', email: 'hetvi.190410107058@gmail.com' },
        attachment: [{
          name: 'MYPdf.pdf',
          content: base64Content, // base64 encoded PDF content
          type: 'application/pdf'
        }]
      };

      // const formData = new FormData();
      // formData.append('to', JSON.stringify([{ email: 'hetviparikh29@gmail.com' }]));
      // formData.append('subject', 'PDF Report');
      // formData.append('htmlContent', 'Please find attached the PDF report.');
      // formData.append('sender', JSON.stringify({ name: 'Hetvi', email: 'hetvi.190410107058@gmail.com' }));
      // formData.append('attachment', new Blob([pdf.output('blob')], { type: 'application/pdf' }), 'MYPdf.pdf');

      const headers = {
        'Content-type': 'application/json',
        'api-key': this.retailApiKey,
      };
      let response1;

      this.http.post('https://api.sendinblue.com/v3/smtp/email', formData, { headers: headers }).toPromise().then((res)=>{
        console.log(res);
        this.notifyService.showSuccess('Email sent successfully to customer email id.');
        this.router.navigate(['/', 'new'])
      }).catch(error => {
        console.log(error);
        this.notifyService.showError('Email could not be send .')
      })
      
      
    });
  }

  // sendEmail() {

  //   const CUSTOMER_EMAIL = 'chhayasaha52@gmail.com';

  //   // Get the receipt element from the browser DOM
  //   const receipt = document.getElementById('download') as HTMLElement;
  //   // Convert the receipt to a PDF using html2pdf
  //   html2pdf(receipt).then((pdfDataUrl: string) => {
  //     console.log(pdfDataUrl);

  //     // Send the PDF receipt as an attachment using the Sendinblue API
  //     const formData = new FormData();
  //     formData.append('to', CUSTOMER_EMAIL);
  //     formData.append('from', 'hetvi.190410107058@gmail.com');
  //     formData.append('attachment', this.dataURItoBlob(pdfDataUrl), 'receipt.pdf');

  //     this.http.post('https://api.sendinblue.com/v3/smtp/email', formData, {
  //       headers: {
  //         'api-key': this.retailApiKey,
  //         'Content-type': 'applcation/json'
  //       },
  //     })
  //     .subscribe((response) => {
  //       console.log('', response);
  //     })

  //   }).catch((error) => {
  //     console.log(error);

  //   });
  // }

  // // Convert a data URI to a Blob object
  // dataURItoBlob(dataURI: string): Blob {
  //   const byteString = atob(dataURI.split(',')[1]);
  //   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([ab], { type: mimeString });
  // }

  // const headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'api-key': this.retailApiKey
  // });

  // this.http.post('https://api.sendinblue.com/v3/smtp/email', data, { headers: headers })
  //   .subscribe(response => {
  //     console.log(response);
  //   });




}
