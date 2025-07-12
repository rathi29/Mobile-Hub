import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {






  apiUrl:string = "https://8080-aedadaaafaafdfbbfbfbecdabbbdbbba.premiumproject.examly.io";

  constructor(private http:HttpClient) { }

  public getAllCustomers():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  public getCustomerById(customerId):Observable<any>{
    return this.http.get(this.apiUrl + '/api/customer/' +customerId);
  }
  

  registerCustomer(customer:any):Observable<any>{
    console.log(customer);
    return this.http.post<any>(this.apiUrl+"/api/customer",customer)
  }

  viewCustomerById(customerId:any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"/api/customer/{customerId}/"+customerId)
  }

  getCustomerByUserId(userId:any):Observable<any>{
    return this.http.get(this.apiUrl+"/api/customer/user/"+userId)
  }


}
