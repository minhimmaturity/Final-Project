import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const api = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  login(phone:string='', password:string=''): Observable<any>{    
    const userInfo = { phone:phone, password:password }
    console.log(userInfo);
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'login'
    , userInfo// data minh se gui len
    , {headers:headers, responseType: 'text'} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  ) 
  }//login
  resetPassword(oldPassword:string='', newPassword:string='', reNewPassword:string=''): Observable<any>{
    var account: any = localStorage.getItem('account')
    var phone = JSON.parse(account).Phone;
    console.log(phone);
    const password = { phone: phone, oldPassword:oldPassword, newPassword:newPassword, reNewPassword: reNewPassword }
    console.log(password);
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'changePassword'
    , password// data minh se gui len
    , {headers:headers, responseType: 'text'} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  ) 
  }//resetPassword


  getAStudent(phone:string=''){    
    const userInfo = { phone:phone}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'getAStudent', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }


  testUpdateStudent(phone: string='', testUpdateStudent: Object){    
    const userInfo = { phone: phone, student: testUpdateStudent}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'testUpdateStudent', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }


  // login(data: any): Observable<any> {
  //   return this.http.post(api + 'login', data);
  // }
}
