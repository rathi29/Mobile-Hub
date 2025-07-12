import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MobileService {

  apiUrl="https://8080-aedadaaafaafdfbbfbfbecdabbbdbbba.premiumproject.examly.io"

  constructor(private http:HttpClient) { }
   
  addMobile(mobile:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/api/mobile",mobile);
  }

  viewAllMobile():Observable<any>{
    return this.http.get<any>(this.apiUrl+"/api/mobile");
  }

  updateMobile(mobileId:any,updatedMobile:any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"/api/mobile/"+mobileId,updatedMobile);
  }

  deleteMobile(mobileId:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl+"/api/mobile/"+mobileId);
  }


  getMobilesByMobileIds(mobileIds: number[]): Observable<any[]> {
    let params = new HttpParams();
    mobileIds.forEach(id => {
      params = params.append('mobileIds', id.toString());
    });

    return this.http.get<any[]>(`${this.apiUrl}/api/mobiles`, { params });
  }

  updateQuantity(mobileId,quantity):Observable<any>{
    return this.http.put<any>(this.apiUrl+"/api/mobile/quantity/"+mobileId,quantity);
  }
  getMobilesById(mobileId:any):Observable<any>{
   return this.http.get<any>(this.apiUrl+"/api/mobiles/"+mobileId);
  }
}
   
