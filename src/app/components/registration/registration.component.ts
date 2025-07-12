import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  //registrationError: string = '';

  constructor(private service: AuthService, private fb: FormBuilder, private router: Router,private toastr:ToastrService) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/)]],
      confirmPassword: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  register() {
    if (this.registrationForm.valid) {
      this.service.register(this.registrationForm.value).subscribe({
        next: data => {
          console.log(data);
          this.registrationForm.reset();    
        },
        error: err => {
          if (err.status === 409) {
            //console.log(err.error)
            this.toastr.success(err.error,'',{
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing'
            });
          } else {
            this.toastr.success("Registered Successfully",'',{
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing'
            });
            this.router.navigate(["/login"]);
           
          }
        }
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
