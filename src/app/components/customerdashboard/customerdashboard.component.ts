import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent implements OnInit {
  isFirstLogin: boolean = false;
  customer: any = null;
  CustomerRegistration: FormGroup;
  userId: any;
  user: any = {};
  registered:boolean;

  constructor(
    private service: CustomerService,
    private fb: FormBuilder,
    private route: Router,
    private aRoute: ActivatedRoute,
    private logoutservice:AuthService,
    private toaster:ToastrService
  ) {
    this.CustomerRegistration = this.fb.group({
      customerName: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userId = parseInt(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.userId);

    this.service.getCustomerByUserId(this.userId).subscribe(data => {
      this.customer = data;
      console.log(data);

      // Set isFirstLogin to true if customer is already registered
      if (this.customer) {
        this.isFirstLogin = true;
        localStorage.setItem('customerId', this.customer.customerId);
        this.route.navigate(['/customerViewMobile']);
      }
    });
  }

  registerCustomer() {
    console.log("amogh");
    if (this.CustomerRegistration.valid) {
      this.customer = { ...this.CustomerRegistration.value };
      this.user.userId = this.userId;
      this.customer.user = this.user;
      console.log(this.customer);

      this.service.registerCustomer(this.customer).subscribe(data => {
        console.log(data)
        this.customer = data;
        this.isFirstLogin = true;
        this.toaster.success("Customer Registered SuccessFully!!",'',{
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
        localStorage.setItem('customerId', this.customer.customerId);
           this.route.navigate(['/customerViewMobile']);
      });
    }
  }
}
