import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  isAdmin:boolean=false;
  isCustomer:boolean=false;
  customerId:number;
  constructor(private cService:CustomerService ,private route:Router,private service:AuthService,private aRoute:ActivatedRoute) { }

  ngOnInit(): void { 
    this.service.isLoggedIn().subscribe(data=>{
      this.isLoggedIn=data;
    });
    console.log(this.isLoggedIn);
    if(this.service.isAdmin()){
        this.isAdmin=true;
    }
    else if(this.service.isCustomer()){
      this.isCustomer=true;
      this.customerId=parseInt(localStorage.getItem('customerId'));
      console.log(this.customerId);
    }
    
   // console.log(this.customer);
  }
  logout(){
    this.isLoggedIn=false;
    this.isAdmin=false;
    this.isCustomer=false;
    this.service.logout();


  }

}
