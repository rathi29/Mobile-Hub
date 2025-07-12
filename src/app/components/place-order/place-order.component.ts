import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddReviewComponent } from '../add-review/add-review.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MobileService } from 'src/app/services/mobile.service';
 
 
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
 
  confirmForm:FormGroup
  mobiles:any[]=[]
  quantity:number;
  quantities:number[];
  customerName:string
  address:string
  totalPrice:number=0;
  customerId:number
  customer:Customer={}
  order:any;
  cartId:number;
  delivery:boolean=false;
  constructor(private route:Router ,private aRoute:ActivatedRoute,private fb:FormBuilder,private customerDash:CustomerService,private orderservice:OrderService,private cartService:CartService,private toastr: ToastrService,private mobileService:MobileService) {
    this.confirmForm=this.fb.group({
      customerName:"",
      address:""
    })
  }
 
  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(data=>{
      this.mobiles=data['mobileId'];
      console.log(data['mobileId'])
      this.quantity=data['quantity'];  
     this.totalPrice=data['totalPrice'];
     this.quantities=data['quantities'];
     this.cartId=data['cartId'];

    })
 
    this.customerId=parseInt(localStorage.getItem('customerId'));
    this.customerDash.getCustomerById(this.customerId).subscribe(data=>{
      //console.log(typeof(data))
      this.customer=data;
      console.log(this.customer.address);
    })
  }
 
 
   makePayment(){
    this.delivery = true;
    console.log('mobiles',this.mobiles)
      this.order={
        'orderPrice':this.totalPrice,
        'quantity':this.quantity,
        'mobiles':this.mobiles.map(id => ({mobileId: id})),
        'customer': { "customerId": this.customerId}
      };
      this.orderservice.addOrder(this.order).subscribe(data=>{
        console.log(data);
        this.mobiles.forEach((mobileId,index) => {
            this.mobileService.getMobilesById(mobileId).subscribe(mData=>{
                  let quant=mData['quantity'];
                  console.log(quant);
                  quant-=this.quantities[index];
                  const mobile={
                    quantity:quant
                  }
                 
                  console.log(quant);
                  this.mobileService.updateQuantity(mobileId,mobile).subscribe(qdata=>{
                    console.log(qdata);
                  })
            })
        });
      });
      this.toastr.success('Payment successful', 'Order Confirmed!',{
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing'
      });
      
 
      this.cartService.removeAllMobileFromCart(this.cartId).subscribe(data=>{});
      setTimeout(()=>
        { 
          this.route.navigate(["/myorder"],{queryParams:{'mobileId':this.mobiles,'quantity':this.quantity,'customerName':this.customerName,'address':this.address}})
        }
        ,4000);
   }
 

  }

 