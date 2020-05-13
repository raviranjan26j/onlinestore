import { Component, OnInit, Injectable } from '@angular/core';
import { BackendService } from 'src/app/backend services/backend.service';
//import { AngularFireAuth } from '@angular/fire/auth/auth';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth/public_api';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/shared/services/user';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: User={displayName:"",uid:"",email:"",
    emailVerified:false,photoURL:""};;
  res:boolean;
  userloggedin:boolean;
  error:boolean;
  dataLoading:boolean;
  errorMessage:string;
  handleError: any;
  username:string="";
  constructor(public afAuth: AngularFireAuth, private _backendService:BackendService,public afs: AngularFirestore) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
    
  }

  ngOnInit() {
   // console.log("________"+localStorage.getItem("isuserloggedin"));
    //console.log(status==null)
    this.getAuthStatus();
    if(status!=null){
      console.log("Entered here..")
    
  }
    this.error=false;
    this.dataLoading=false;
    this.userloggedin=false;
   /* if (status != null) {
      this.userloggedin=true;
     console.log(">>>>>>>>>>>>>>>>>>>test "+localStorage.getItem('user'))
    
    } */
  }

  login(loginType,formData?){
    this.dataLoading=true;
    return this._backendService.login(loginType,formData).then((result)=>{
    location.reload();
     this.dataLoading=false;
      /* this.userData={displayName:result.user.displayName,uid:result.user.uid,email:result.user.email,
        emailVerified:result.user.emailVerified,photoURL:result.user.photoURL};*/
    }).catch((err)=>{
      this.error=true;
        this.errorMessage=err.errorMessage;
        this.userloggedin=false;
        this.dataLoading=false;
    });
    }

  logout(){
    this.dataLoading=true;
    return this._backendService.logout().then((success)=>
    {
      
      localStorage.clear();
      this.userloggedin=false;
      this.dataLoading=false;
    });
  }
  

  getAuthStatus(){
    this.dataLoading=true;
    this._backendService.redirectLogin().then((result)=>{
      if(result.credential){
        console.log(result.user);
      //  var test=this.SetUserData(result.user);
       // console.log("user detailsssss---"+test);
      //  console.log("userInfo=>>>>",+this.userData.displayName);

        this.userData={displayName:result.user.displayName,uid:result.user.uid,email:result.user.email,
        emailVerified:result.user.emailVerified,photoURL:result.user.photoURL};
        this.username=this.userData.displayName;
        console.log(this.userData.displayName+">>>>>>>>")
       /* if(result.credential["accessToken"]!=""){  
        this.userData.uid=result.user.uid;
        this.userData.email=result.user.email;
        this.userData.photoURL=result.user.photoURL;
        this.userData.displayName=result.user.displayName;
        this.userData.emailVerified=result.user.emailVerified;*/
          this.dataLoading=false;

          if(this.userData.emailVerified==false){
            alert("please verify you email to continue");
            this.logout();
          }
          else{
          localStorage.setItem("isAuthenticUser","1");
          return this.userloggedin=true;
          }
       } 
       console.log(this.afAuth.authState)  
       if (this.afAuth.authState) {
        this.afAuth.currentUser.then((res)=>{
          //console.log("KKKKK"+res.displayName);
          
          this.userData={displayName:res.displayName,uid:res.uid,email:res.email,
            emailVerified:res.emailVerified,photoURL:res.photoURL};
            this.username=this.userData.displayName;
            if(this.userData.emailVerified==false){
              alert("please verify you email to continue");
              this.logout();
            }
            else{
            localStorage.setItem("isAuthenticUser","1");
            this.userloggedin=true;
          }
        });
         
       } 
        this.dataLoading=false;

      }
    ).catch(
      (err)=>{
        this.error=true;
        this.errorMessage=err.errorMessage;
        console.log(err);
        this.userloggedin=false;
        this.dataLoading=false;
      }
    );
    console.log("output--->>>>>>>"+this.userData);
    this.dataLoading=false;
  }


}
