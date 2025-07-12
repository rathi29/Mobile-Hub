import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  orders:any;
  mobiles:any[]
  quantity:number
  customerName:string;
  address:string;
  constructor(private aRoute:ActivatedRoute,private service:OrderService) { }

  ngOnInit(): void {
    this.service.viewAllOrders().subscribe(data=>{
      this.orders=data
      
    
    })
  }

}
