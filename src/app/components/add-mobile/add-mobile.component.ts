import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.css']
})
export class AddMobileComponent implements OnInit {

  mobileForm:FormGroup;
  constructor(private mobileService:MobileService,private fb:FormBuilder,private route:ActivatedRoute,private toaster:ToastrService,private router:Router) { 


    this.mobileForm=this.fb.group({
      model:['',[Validators.required]],
      brand:['',[Validators.required]],
      imageUrl:[''],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
      quantity:['',[Validators.required]]
    })

  }

  ngOnInit(): void {
  }


  addMobile():void{
    if (this.mobileForm.valid) {
      this.mobileService.addMobile(this.mobileForm.value).subscribe({
        next: data => {
          console.log(data);
          this.mobileForm.reset();    
        },
        error: err => {
          if (err.status === 409) {
            //console.log(err.error)
            this.toaster.success(err.error,'',{
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing'
            });
          } else {
            this.toaster.success("Mobile added Successfully",'',{
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing'
            });
            this.router.navigate(["/viewmobile"]);
           
          }
        }
      });
    } else {
      this.mobileForm.markAllAsTouched();
    }
}

  
}
