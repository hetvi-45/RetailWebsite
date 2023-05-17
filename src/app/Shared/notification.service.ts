import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService, private snackBar: MatSnackBar) { }

  showSuccess(message: any){
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'custom-snack',
     });
}

showError(message: any){
  this.snackBar.open(message, 'Dismiss', {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: 'custom-snack2',
    
   });
}

showInfo(message: any){
  this.snackBar.open(message, 'Dismiss', {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: 'custom-snack3',
   });
}

showWarning(message: any){
  this.snackBar.open(message, 'Dismiss', {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: 'custom-snack4',
   });
}

}

