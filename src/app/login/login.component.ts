import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../Shared/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../Shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any
  adminOrSale: any
  constructor(private loginService: LoginService, private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
    // this.loginService.register();
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.loginService.login(form.value)
    form.reset();
    // if(this.login === 'true' && this.adminOrSale === 'true'){
    //   // this.toastr.success('Loggedin');
    //   form.reset();
    //   this.router.navigate(['/', 'admin', 'dashboard']);
    //   this.notifyService.showSuccess('Logged in as admin successfully.');
    // } else if(this.login === 'true' && this.adminOrSale === 'false'){
    //   form.reset();
    //   this.router.navigate(['customer', 'new']);
    //   this.notifyService.showSuccess('Logged in  successfully.')
    // } else if(this.login === 'false'){
    //   this.notifyService.showError('Problem with the loggedin. Please Try again.')
    //   form.reset();
    // }
    
  }

}
