import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMobileComponent } from './components/add-mobile/add-mobile.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { CustomerViewMobileComponent } from './components/customer-view-mobile/customer-view-mobile.component';
import { CustomerdashboardComponent } from './components/customerdashboard/customerdashboard.component';
import { EditMobileComponent } from './components/edit-mobile/edit-mobile.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ViewMobileComponent } from './components/view-mobile/view-mobile.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ViewReviewComponent } from './components/view-review/view-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from './search-filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    AddMobileComponent,
    AddReviewComponent,
    CustomerViewMobileComponent,
    CustomerdashboardComponent,
    EditMobileComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MyCartComponent,
    MyOrdersComponent,
    NavbarComponent,
    PlaceOrderComponent,
    RegistrationComponent,
    ViewMobileComponent,
    ViewOrdersComponent,
    ViewReviewComponent,
    SearchFilterPipe
  ],
  imports: [
    ToastrModule.forRoot({
  timeOut: 20000,
  progressBar: true,
  progressAnimation: 'increasing', 

    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
