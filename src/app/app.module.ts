import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { AppRoutingModule } from './app-routing.module';
import { CustommaterialModule } from './custommaterial.module';
import { SettingsComponent } from './settings/settings.component';
import { SetproductComponent } from './Admin/setproduct/setproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { AdminordersComponent } from './Admin/adminorders/adminorders.component';
import { AdmintabComponent } from './Admin/admintab/admintab.component';
import { AdminusersComponent } from './Admin/adminusers/adminusers.component';
import { AdmincartsComponent } from './Admin/admincarts/admincarts.component';
import { CartsComponent } from './user/carts/carts.component';
import { LoginComponent } from './user/login/login.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProductComponent } from './user/product/product.component';
import { UserComponent } from './user/user/user.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SignupComponent } from './signup/signup.component';
import { PaymentsComponent } from './payments/payments.component';
import { WindowRefService } from './window-ref.service';
import { AuthGuardService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    SettingsComponent,
    SetproductComponent,
    AdmincartsComponent,
    AdminordersComponent,
    AdmintabComponent,
    AdminusersComponent,
    CartsComponent,
    LoginComponent,
    OrdersComponent,
    ProductComponent,
    UserComponent,
    SignupComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustommaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireStorageModule, BrowserAnimationsModule, AuthGuardService

  ],
  providers: [WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
