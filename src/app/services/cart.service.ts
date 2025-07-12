import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {





  apiUrl:string="https://8080-aedadaaafaafdfbbfbfbecdabbbdbbba.premiumproject.examly.io"
  constructor(private http:HttpClient) { }

  updateCart(cartDetails:any):Observable<any>{
    console.log(cartDetails,"cartDetails")
    return this.http.put<any>(this.apiUrl + "/api/cart/" + cartDetails.cartId,cartDetails)
  }

  getAllMobileFromCart(customerId):Observable<any>{
    return this.http.get<any>(this.apiUrl+"/api/cart/customer/"+customerId);
  }

  addCart(cart:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/api/cart",cart);
  }

  removeMobileFromCart(cartId:number,mobileId:number){
    return this.http.delete<any>(this.apiUrl+"/api/cart/"+cartId+"/mobile/"+mobileId);
  }

  removeAllMobileFromCart(cartId:number){
    return this.http.delete<any>(this.apiUrl+"/api/cart/"+cartId);
  }

   public addReview(Review):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/api/review",Review);
  }

  public getAllReviews():Observable<any>{
    return this.http.get<any>(this.apiUrl+"/api/review");
  }

  getCart():Observable<any>{
    return this.http.get<any>(this.apiUrl+"/api/cart");
  }
  
}
