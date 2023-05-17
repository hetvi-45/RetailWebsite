import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/Shared/login.service';
import { NotificationService } from 'src/app/Shared/notification.service';
import { v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  selectedRole: any;
  @ViewChild('button') button!: ElementRef<HTMLButtonElement>;
  showDiv : boolean = false
  displayedColumns: string[] = ['name', 'email', 'password', 'type', 'edit/delete'];
  dataSource: any ;
  editMode:boolean = false;
  editable: any = {'email': '', 'password': '', 'type': ''};
  allUser: any;
  constructor(private loginService: LoginService, private notifyService: NotificationService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.dataSource = JSON.parse(localStorage.getItem('user') || '[]');
    this.http.get('http://localhost:3000/api/users').toPromise().then((u : any) => {
      this.dataSource = u

      console.log(u[0]);
      
    }).catch((error) => {
      console.log(error);
      
    })
  }

  selectChangeHandler(event: any)
  {
    this.selectedRole = event.target.value;

  }

  async onSubmit(form: NgForm){
    if(this.editMode){
      const token = sessionStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', token);
      this.http.patch(`http://localhost:3000/api/users/${this.editable.id}`, form.value, {headers}).toPromise().then((u: any) => {
        console.log(u);
        this.notifyService.showSuccess('User Edited Successfully.');
        this.http.get('http://localhost:3000/api/users/').toPromise().then((user: any) => {
          console.log(user);
          
        this.dataSource = user;
      }).catch(error => {
        console.log(error);
      })  
    }).catch(error => {
      console.log(error);
      this.notifyService.showError('Problem to edit user.')
      })
      form.reset();
      this.button.nativeElement.click();
      
    } else {

      var curr = form.value
      // curr['id'] = uuidv4();
      curr['type'] = this.selectedRole;
      // console.log(form.value);
      this.http.post('http://localhost:3000/api/users/signup', curr).toPromise().then((u: any) => {
      console.log(u);
      const token = sessionStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', token);
      this.http.get('http://localhost:3000/api/users/', {headers}).toPromise().then((u : any) => {
      this.dataSource = u 
      console.log(u);
           
    }).catch((error) => {
      console.log(error);
      
    })
      this.notifyService.showSuccess('User Added Successfully.')
    }).catch(error => {
      console.log(error);
      this.notifyService.showError('Not able to add user, please try again later.')
      
    })
      form.reset();
      this.button.nativeElement.click();
      
    }
    //  console.log(this.button);
     
     
  }

  editUser(element: any){
    this.editMode = true;
    this.editable = element;
    console.log(this.editMode, this.editable);
    
  }

  deleteUser(i: any){
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.delete(`http://localhost:3000/api/users/${i}`, {headers}).toPromise().then((u: any) => {
      console.log(u);
      this.http.get('http://localhost:3000/api/users').toPromise().then((user: any) => {
        this.dataSource = user;
      }).catch(error => {
        console.log(error);
        
      })
    }).catch(error => console.log(error));
    // this.dataSource.splice(i,1);
    // localStorage.setItem('user', JSON.stringify(this.dataSource));
    // this.dataSource = JSON.parse(localStorage.getItem('user') || '[]');
  }

}
