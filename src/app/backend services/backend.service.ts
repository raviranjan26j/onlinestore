import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { observable, Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../shared/services/user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  userData: any;
  constructor(public afAuth:AngularFireAuth,public router:Router,public afs: AngularFirestore ) { }
  getConfig(){
    return environment.socialLink;
  }

  login(loginType,formData) {
   //this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
   if(formData){
      return this.afAuth.signInWithEmailAndPassword(formData.email,formData.password).then((result) => {
      // window.alert("hiiiii")
       this.SetUserData(result.user);
       console.log(">>>>???????"+this.userData);
      }).catch((error) => {
        window.alert(error.message)
        return null;
      })
   }
   else{
     let loginMethod;
     if(loginType=='FB'){loginMethod=new firebase.auth.FacebookAuthProvider();}
     if(loginType=='GOOGLE'){
       loginMethod=new firebase.auth.GoogleAuthProvider();
       console.log("inside google auth")
      }
      console.log("completed!!!")
     return this.afAuth.signInWithPopup(loginMethod);
   }

  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  logout() {
   return this.afAuth.signOut();
  }
  isUserLoggedin(){
   return this.afAuth.authState;
  }
  redirectLogin(){
   this.afAuth.getRedirectResult().then((result)=>{
        console.log("----------"+result.user);
        return this.afAuth.getRedirectResult();
    })
    return this.afAuth.getRedirectResult();
  }

  signup(email,password){

    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
    .then(() => {
      alert('email verification link has been send to your email addres please confirm it...')
      this.router.navigate(['/login']);
    })
  }


//fake methods:
  getCartTotal(){
    let response:number=10;
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  getUserStatus(){
    let response=true;
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  getProducts(coltype){
    let response=[{
      'category':'test category','scategory':'ravi',
      'name':'ranjan','price':'2021','_id':'201'
    },{
      'category':'testing.. category','scategory':'pratul',
      'name':'kumar','price':'2022','_id':'202'
    }]
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  getFilterProducts(coltype,filters){
    let response=[{
      'category':'test category','scategory':'ravi',
      'name':'ranjan','price':'2021','_id':'201'
    },{
      'category':'testing.. category','scategory':'pratul',
      'name':'kumar','price':'2022','_id':'202'
    }]
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  setProducts(coltype,filters){
    let response=true;
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  updateProducts(coltype,filters){
    let response=true;
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  getOneProductsDoc(coltype,docId){
    let response={
      'category':'test category','scategory':'ravi',
      'name':'ranjan','price':'2021','_id':'201'
    };
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  delOneProductsDoc(coltype,docId){
    let response=true;
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  updateShoppingInterest(coltype,docId){
    let response=true;
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

  updateShoppingCart(coltype,docId){
    let response=true;
    return Observable.create(
      observer=>{
      setTimeout(() => {
        observer.next(response)
      }, 2000)
     }
    )
  }

}
