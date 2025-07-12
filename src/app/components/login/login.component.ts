import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  role: any;
  userId: any;
  loginError: string = '';

  constructor(private service: AuthService, private fb: FormBuilder, private router: Router,private toastr:ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  login() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        next: data => {
          this.role = data.role;
          this.userId = data.userId;

          if (this.role === "ADMIN") {
            const targetPath = '/viewmobile/';
            window.location.href = targetPath;
          } else if (this.role === "CUSTOMER") {
            const targetPath = '/customerdashboard/' + this.userId;
            window.location.href = targetPath;
          }
        },
        error: err => {
          if (err.status === 401) { 
            this.toastr.success(err.error,'',{
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing'
            });
            
          } else {
            this.toastr.success('An error occurred. Please try again later.','',{
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing'
            });
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
