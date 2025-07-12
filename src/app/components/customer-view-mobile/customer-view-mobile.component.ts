import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart.model';
import { Mobile } from 'src/app/models/mobile.model';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-customer-view-mobile',
  templateUrl: './customer-view-mobile.component.html',
  styleUrls: ['./customer-view-mobile.component.css']
})
export class CustomerViewMobileComponent implements OnInit {
  cartId:number=0;
  searchText:string;
  viewMobile:any[];
  customer:any;
  customerId:number;
  mobiles:any[]=[];
  cart:Cart={};
  constructor(private aRoute:ActivatedRoute,private service:MobileService,private cartService:CartService,private toastr:ToastrService) { 
    
    
  }
  ngOnInit() {
    this.viewAllMobile();
    this.customerId=parseInt(localStorage.getItem('customerId'));
    this.cartService.getAllMobileFromCart(this.customerId).subscribe(data=>{
        this.cart=data;
       

    });
    setTimeout(()=>{
    console.log(this.cart);
    console.log(this.customerId);
    },1000
    )

    

    
  }



  viewAllMobile(){
    this.service.viewAllMobile().subscribe(data=>{
      console.log(data,"mobiledatacheck");
      this.viewMobile=data;
    })
  }

  addToCart(mobile:any){
    console.log(this.cart.cartId);
    if(this.cart.cartId===undefined){
      this.mobiles.push(mobile);
      this.cart={
        customer:{customerId:this.customerId},
        mobiles:this.mobiles
      }
      this.cartService.addCart(this.cart).subscribe(data=>{
        this.toastr.success("Item Added To Cart Sucessfully",'',{
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
        this.cart=data; 
      });
      
    }
    else{
      let flag:boolean=false;
      this.mobiles=this.cart.mobiles;
      for(let m of this.mobiles){
        if(m.mobileId===mobile.mobileId){
          flag=true;
          break;
        }
      }
      if(flag){
        this.toastr.success("Already in cart",'',{
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
      else{
      this.mobiles.push(mobile);
      this.cart.mobiles=this.mobiles;
      this.cartService.updateCart(this.cart).subscribe(data=>{
          console.log(data);
          this.toastr.success("Item Added To Cart Sucessfully",'',{
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing'
          });
        });
      }
      
    }
  }

  
  


currentSlideIndex: number = 0;

prevSlide() {
    const slider = document.querySelector('.slider') as HTMLElement;
    const totalSlides = this.viewMobile.length;
    if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
    } else {
        this.currentSlideIndex = totalSlides - 1;
    }
    const slideWidth = slider.offsetWidth;
    slider.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`;
}

nextSlide() {
    const slider = document.querySelector('.slider') as HTMLElement;
    const totalSlides = this.viewMobile.length;
    if (this.currentSlideIndex < totalSlides - 1) {
        this.currentSlideIndex++;
    } else {
        this.currentSlideIndex = 0;
    }
    const slideWidth = slider.offsetWidth;
    slider.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`;
}





}
