import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  allUser: any;
  result: any;
  user: any;
  constructor(private http: HttpClient, private  router:Router, private notifyService: NotificationService) { }

  login(user: any) {
    this.http.post('http://localhost:3000/api/users/login', user).toPromise().then((u: any) => {
      this.result = u.user;
      console.log(u.token);
      
      console.log(this.result.type); // this will print the value of this.result
    
      if(this.result && this.result.type === "admin"){
        sessionStorage.setItem('isLogin', 'true');
        sessionStorage.setItem('isAdmin', 'true');
        sessionStorage.setItem('token', u.token);
        this.router.navigate(['/', 'admin', 'dashboard'])
        this.notifyService.showSuccess('Loggedin as admin successfull');
      } else if(this.result && this.result.type === "sale"){
        sessionStorage.setItem('isLogin', 'true')
        sessionStorage.setItem('isAdmin', 'false');
        sessionStorage.setItem('saleid', this.result.id);
        sessionStorage.setItem('token', u.token);
        this.router.navigate(['/', 'customer', 'new'])
        this.notifyService.showSuccess('Loggedin successfull');
      } else{
        sessionStorage.setItem('isLogin', 'false')
        this.router.navigate(['/']);
      }


    }).catch((error: HttpErrorResponse) => {
      this.notifyService.showError('Invalid Credentials');
    });
    // this.allUser = JSON.parse(localStorage.getItem("user") || "[]");
    // console.log(this.allUser);

    // this.result = this.allUser.find((u:any) => 
    //   u.email === user.email   && u.password === user.password   
    // );
    

    
  }
  register(user: any) {
    // const user = [
    //   {
    //     "email": "admin@gmail.com",
    //     "password": "123456",
    //     "type": "admin"
    //   },

    // ];
    // this.user = JSON.parse(localStorage.getItem('user') || '[]');
    // var result = this.user.find((u: any) => u.email === user.email);
    let result;
    
    // if (!result) {
    //   this.user.push(user);
    //   localStorage.setItem("user", JSON.stringify(this.user));
    // }
  }
}
