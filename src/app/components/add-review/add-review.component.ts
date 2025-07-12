import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer.model';
import { Review } from 'src/app/models/review.model';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  reviewForm:FormGroup;
  customer:Customer;
  mobile:any[];
  review:Review = {};
  customerId:any;

  constructor(private cartService:CartService, private mobileService:MobileService, private fb:FormBuilder, private aRoute:ActivatedRoute,private router:Router,private customerService:CustomerService,private toastrService:ToastrService) { 
     
  }
  
  ngOnInit(): void {
    this.getAllMobile();
    this.reviewForm = this.fb.group({
      // customerId:['',[Validators.required]],
      subject:['',[Validators.required]],
      body:['',[Validators.required, Validators.minLength(10)]],
      rating:['',[Validators.required, Validators.min(1), Validators.max(5)]]
    });
    
    this.aRoute.params.subscribe(data=>{
      this.customer = data;
      console.log(data);
    })

    this.customerId=localStorage.getItem('customerId');
    this.customerService.getCustomerById(this.customerId).subscribe(data=>{
      console.log(data)
      this.customer=data;
    })


  }

  addReview(){
    this.review = {
      ...this.reviewForm.value, 
      dateCreated: new Date(),
      customer:this.customer
    }
    
    if(this.reviewForm.valid){
      this.cartService.addReview(this.review).subscribe(data =>{
        console.log(data);
        this.reviewForm.reset();
        this.toastrService.success("Review Added SuccessFully!","",{
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
         })
        this.router.navigate(['/viewReview']);


      });
    }else{
      this.reviewForm.markAllAsTouched();
      console.log("Form is invalid");
    }
  }

  getAllMobile(){
    this.mobileService.viewAllMobile().subscribe(data=>{
      this.mobile = data;
      console.log(data);
    })
  }


}
