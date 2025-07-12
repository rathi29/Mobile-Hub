import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {





  apiUrl="https://8080-aedadaaafaafdfbbfbfbecdabbbdbbba.premiumproject.examly.io";
  constructor(private http:HttpClient) { }

  addOrder(orderData:any):Observable<any>{
    console.log(orderData,"orderdata")
    return this.http.post<any>(`${this.apiUrl}/api/order`,orderData);
  }
  viewAllOrders():Observable<any>{
    return this.http.get<any>(this.apiUrl+'/api/order');
  }
  viewOrderByUserId(Id:number):Observable<any>{
    return this.http.get<any>('${this.apiUrl}/api/order/user/${userId}');
  }

  getOrdersByCustomerId(customerId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl+"/api/order/customer/"+customerId);
  }  
  
}
