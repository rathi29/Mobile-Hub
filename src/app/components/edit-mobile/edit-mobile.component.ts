import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mobile } from 'src/app/models/mobile.model';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-edit-mobile',
  templateUrl: './edit-mobile.component.html',
  styleUrls: ['./edit-mobile.component.css']
})
export class EditMobileComponent implements OnInit {
   mobileForm:FormGroup;
   mobileId: any;
   mobile:any;

   editedMobile:any;

   constructor(private fb:FormBuilder,private mobileservice:MobileService,private aroute:ActivatedRoute,private router:Router,private toastr:ToastrService) {
    this.mobileForm=this.fb.group({
      model:['',[Validators.required]],
      brand:['',[Validators.required]],
      imageUrl:['',[Validators.required]],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
      quantity:['',[Validators.required]]

    })
   }
  
  ngOnInit(): void {
   this.mobileId = parseInt(this.aroute.snapshot.paramMap.get('mobileId'));
console.log(this.mobileId,"mobileid")

this.mobileservice.getMobilesById(this.mobileId).subscribe(data=>{
 this.editedMobile=data;
 console.log(this.mobile);
})
  }
  saveMobile(){
    this.mobileservice.updateMobile(this.editedMobile.mobileId,this.editedMobile).subscribe(data=>{
      console.log(data);
    });
    this.editedMobile=null;
    this.toastr.success("Updated Successfully",'',{
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
    this.router.navigate(['/viewmobile']);
    
  }
  cancel(){
    this.editedMobile=null;
    this.router.navigate(['/viewmobile']);

  }

}
