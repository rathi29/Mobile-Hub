import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {

  reviews:Review[];
  customerId:any;
  customerName:any
  constructor(private cartService:CartService, private route:ActivatedRoute,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getAllReviews();
    this.customerId=parseInt(localStorage.getItem("customerId"))
    this.customerService.getCustomerById(this.customerId).subscribe(data=>{
      this.customerName=data['customerName'];
    })

  }
  
  getAllReviews(){
    this.cartService.getAllReviews().subscribe(data=>{
      this.reviews = data;
      console.log(this.reviews);
    })
  }
  
       
}
