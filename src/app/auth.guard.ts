import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem('isLogin')=='true' && sessionStorage.getItem('isAdmin') == 'true') {
        return true;
        // this.router.navigate(['/appointment']);

      } else if (sessionStorage.getItem('isLogin')=='true' && sessionStorage.getItem('isAdmin') == 'false') {
        // console.log(this.userService.isPatient);
        return true;
        // this.router.navigate(['/checkup']);

      } else{
        // alert("You are not allowed to run this page.");
        // this.router.navigate(['']);
        return false;
      }
  }
  
}
