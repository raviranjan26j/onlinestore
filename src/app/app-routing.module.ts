import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SettingsComponent} from './settings/settings.component'
import { SetproductComponent } from './Admin/setproduct/setproduct.component';
import { AdmintabComponent } from './Admin/admintab/admintab.component';
import { ProductComponent } from './user/product/product.component';
import { LoginComponent } from './user/login/login.component';
import { CartsComponent } from './user/carts/carts.component';
import { AdmincartsComponent } from './Admin/admincarts/admincarts.component';
import { SignupComponent } from './signup/signup.component';
import { PaymentsComponent } from './payments/payments.component';
import { AuthGuardService } from './auth.service';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';


const routes : Routes= [
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'aboutus', component:AboutusComponent, canActivate: [AuthGuardService]},
  {path:'admin', component:AdmintabComponent, canActivate: [AuthGuardService]},
  {path:'services', component:SettingsComponent, canActivate: [AuthGuardService]},
  {path:'product', component:ProductComponent, canActivate: [AuthGuardService]},
  {path:'login', component:LoginComponent},
  {path:'cart', component:AdmincartsComponent, canActivate: [AuthGuardService]},
  {path:'signup', component:SignupComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'payment', component:PaymentsComponent, canActivate: [AuthGuardService]},
  {path:'**', redirectTo:'/login',pathMatch:'full'} 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
})
export class AppRoutingModule { }
