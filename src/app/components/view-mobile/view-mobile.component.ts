import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mobile } from 'src/app/models/mobile.model';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-view-mobile',
  templateUrl: './view-mobile.component.html',
  styleUrls: ['./view-mobile.component.css']
})
export class ViewMobileComponent implements OnInit {
  viewMobile:Mobile[];
  mobileForm:FormGroup;
  selectedMobile:Mobile=null;
  constructor(private fb:FormBuilder,private mobileService:MobileService,private router:Router){ 
    this.mobileForm=this.fb.group({
      model:['',[Validators.required]],
      brand:['',[Validators.required]],
      price:['',[Validators.required]],
      imageUrl:'',
      description:['',Validators.required],
      quantity:['',[Validators.required]]


    })
  }

  ngOnInit(): void {
    this.getAllMobile();
  }
  
  getAllMobile(){
    this.mobileService.viewAllMobile().subscribe(data=>{
      this.viewMobile=data;
      console.log(this.viewMobile,"all mobiles")
    });
  }

  deleteMobile(mobileId){
    this.mobileService.deleteMobile(mobileId).subscribe(data=>{
      this.getAllMobile();
    });
    
  }

  editMobile(mobile){
    this.selectedMobile={...mobile};
    // this.router.navigate(['/editMobile'],{queryParams:{'selectedMobile':this.selectedMobile}});
    this.router.navigate(['/editMobile',mobile.mobileId]);
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
