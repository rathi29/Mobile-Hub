import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddMobileComponent } from './components/add-mobile/add-mobile.component';
import { CustomerViewMobileComponent } from './components/customer-view-mobile/customer-view-mobile.component';
import { CustomerdashboardComponent } from './components/customerdashboard/customerdashboard.component';
import { EditMobileComponent } from './components/edit-mobile/edit-mobile.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ViewMobileComponent } from './components/view-mobile/view-mobile.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { ViewReviewComponent } from './components/view-review/view-review.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"login",component:LoginComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"customerViewMobile",component:CustomerViewMobileComponent,canActivate:[AuthGuardService],data:{expectedRole:['CUSTOMER']}},
  {path:"customerdashboard/:id",component:CustomerdashboardComponent,canActivate:[AuthGuardService],data:{expectedRole:['CUSTOMER']}},
  {path:"mycart",component:MyCartComponent,canActivate:[AuthGuardService],data:{expectedRole:['CUSTOMER']}},
  {path:"myorder",component:MyOrdersComponent,canActivate:[AuthGuardService],data:{expectedRole:['CUSTOMER']}},
  {path:"placeOrder",component:PlaceOrderComponent,canActivate:[AuthGuardService],data:{expectedRole:['CUSTOMER']}},
  {path:"addReview", component:AddReviewComponent,canActivate:[AuthGuardService],data:{expectedRole:['CUSTOMER']}},
  {path:"viewmobile",component:ViewMobileComponent,canActivate:[AuthGuardService],data:{expectedRole:['CUSTOMER','ADMIN']}},
  {path:"addMobile",component:AddMobileComponent,canActivate:[AuthGuardService],data:{expectedRole:['ADMIN']}},
  {path:"editMobile/:mobileId",component:EditMobileComponent,canActivate:[AuthGuardService],data:{expectedRole:['ADMIN']}},
  {path:"viewOrder",component:ViewOrdersComponent,canActivate:[AuthGuardService],data:{expectedRole:['ADMIN','CUSTOMER']}},
  {path:"viewReview",component:ViewReviewComponent,canActivate:[AuthGuardService],data:{expectedRole:['ADMIN','CUSTOMER']}},
  {path:"**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
