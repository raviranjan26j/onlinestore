import { Injectable, NgModule } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { BackendService } from './backend services/backend.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
@NgModule({
    declarations: [],
    imports: [],
  })

export class AuthGuardService implements CanActivate {

  constructor (private _backendService: BackendService, private _router: Router,public afAuth: AngularFireAuth) { }
  async canActivate(): Promise<boolean> {
      const authenticatedUser = await this._backendService.isUserLoggedin();
      const authenticated = !!authenticatedUser;
      if(localStorage.getItem("isAuthenticUser")=="1"){
        return true; 
      }
      alert('please login to continue...');
      this._router.navigate(['/login']);
    }
      
}