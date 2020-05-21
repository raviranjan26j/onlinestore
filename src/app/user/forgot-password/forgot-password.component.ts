import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth,public router:Router) { }

  ngOnInit(): void {
  }
  resetPassword(email){
    console.log("forgot password"+email)
    this.afAuth.sendPasswordResetEmail(email).then((result) => {
      alert('reset link send to '+email);
    this.router.navigate(['/login']);
    }).catch((error) => {
      window.alert(error.message)
    })
    
  }
}
