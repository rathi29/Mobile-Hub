import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer.model';
import { Mobile } from 'src/app/models/mobile.model';
import { Order } from 'src/app/models/order.model';
import { MobileService } from 'src/app/services/mobile.service';
import { OrderService } from 'src/app/services/order.service';
 
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders2:any[]=[];
  customer: Customer;
  customerId: number;
  mobile: number[] = []; // Initialize as empty array
 
  constructor(
    private route: Router,
    private service: OrderService,
    private aRoute: ActivatedRoute,
    private mobileService: MobileService,
    private toastrService:ToastrService
  ) {}
 
  ngOnInit(): void {
    this.customerId = parseInt(localStorage.getItem('customerId'));
    this.getOrderByCustomerId();

  }
 
  getOrderByCustomerId() {
    this.service.getOrdersByCustomerId(this.customerId).subscribe(data => {
      console.log(data);
      this.orders2=data;
      console.log(this.orders2)
    });
  }
 
 
 
 
  public addReview(){
     
    this.route.navigate(["/addReview"]);
  }
 
 
 
 
 
}