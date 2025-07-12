import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl='https://8080-aedadaaafaafdfbbfbfbecdabbbdbbba.premiumproject.examly.io/';
  constructor(private http:HttpClient,private route:Router) {}
  private tokenKey='authToken';
  private roleKey='role';
  private loggedIn= new BehaviorSubject<boolean>(this.hasToken());

  register(user):Observable<any>{
    return this.http.post<any>(this.apiUrl+"api/register",user);
  }
  login(userData):Observable<any>{

    return this.http.post<any>(this.apiUrl+"api/login",userData).pipe(map(response=>{
      console.log(response);  
      if(response.token){
        localStorage.setItem(this.tokenKey,response.token);
        const role=this.getRoleFromToken(response.token);
        localStorage.setItem(this.roleKey,response.role);
        localStorage.setItem("userId",response.userId);
        this.loggedIn.next(true);
        console.log(localStorage.getItem('authToken'));
      }
      return response;
    }));
  }
  logout(){
    localStorage.clear();
    this.loggedIn.next(false);
    this.route.navigate(['/login']);
  }

 
  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
  private hasToken(){
    return !!localStorage.getItem(this.tokenKey);
  }
  getToken():string|null{
    return localStorage.getItem(this.tokenKey);
  }
  private getRoleFromToken(token:string):string{
    const payload=JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
  getRole():string|null{
    return localStorage.getItem('role');
  }
 
  isAdmin(){
    let token=localStorage.getItem('role');
    if(token === 'ADMIN')
    return true;
    else return false;
  }
 
  isCustomer(){
    let token=localStorage.getItem('role');
    if(token === 'CUSTOMER')
    return true
    else return false;
  }
}
