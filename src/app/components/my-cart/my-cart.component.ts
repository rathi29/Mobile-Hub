import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Mobile } from 'src/app/models/mobile.model';
import { CartService } from 'src/app/services/cart.service';
 
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
 
  mobiles:Mobile[]=[];
  mobileId:any[]=[]
  quantity:number=0;
  quantities:number[]=[];
  customerId:number;
  cartId:number;
  totalprice:number=0;
  flag:boolean=false;
 
  constructor(private service:CartService,private route:Router,private aRoute:ActivatedRoute) { }
 
  ngOnInit(): void {
    this.customerId=parseInt(localStorage.getItem('customerId'));
    this.getAllMobileFromCart();
  }
  
  getAllMobileFromCart(){
    this.service.getAllMobileFromCart(this.customerId).subscribe(data=>{
      this.mobiles=data['mobiles'];
      this.cartId=data.cartId;
      this.flag = false;
      console.log(this.mobiles);
      this.mobiles.forEach((element,index) => {
        this.quantities[index]=1;
    });
    console.log(this.quantities);
    });
  }
  
  removeMobileFromCart(mobileId:number){
    this.service.removeMobileFromCart(this.cartId,mobileId).subscribe(data=>{
      console.log(data);
      this.getAllMobileFromCart();
    });
 
  }
 
  removeAllMobileFromCart(cartId:number){
    this.service.removeAllMobileFromCart(cartId).subscribe(data=>{
      //console.log(data);
      this.getAllMobileFromCart();
    });
 
  }
 
  placeOrder(){
   
    this.mobiles.forEach((m,index) => {
      this.quantity+=this.quantities[index];
      this.totalprice+=m.price*this.quantities[index];
      this.mobileId.push(m.mobileId)
    });
    console.log(this.quantity);
    this.route.navigate(["/placeOrder"],{queryParams:{'mobileId':this.mobileId,"quantity":this.quantity,"totalPrice":this.totalprice,'quantities':this.quantities,'cartId':this.cartId}})
  }
 
}