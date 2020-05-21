import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { WindowRefService } from '../window-ref.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/services/user';
import { BackendService } from '../backend services/backend.service';
 // import { from } from 'rxjs'; 

@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
    form: FormGroup;
    amount:number=899;
    selected = true;
    package:string="Premium";
    pkgImage:string="assets/images/premium_logo.jpg";
    userDetails:any;
    isPaymentDone:boolean=false;
    pkgName:string;
    userData: User={displayName:"",uid:"",email:"",
    emailVerified:false,photoURL:""};

  constructor( private _backendService:BackendService,private winRef:WindowRefService ,private _formBuilder: FormBuilder,public afAuth: AngularFireAuth,) { 
    this.form = _formBuilder.group({
        package: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userDetails=JSON.parse(localStorage.getItem('user'));
    //localStorage.setItem('ispaymentdone',"2");
    if(localStorage.getItem('ispaymentdone')=="1"){
        this.isPaymentDone=true;
        this.pkgName=localStorage.getItem('package')
    }
    else{
        this.isPaymentDone=false;
    }
}


 paymentProcess() {
    var options = {
        "key": "rzp_test_62SvhsTaILqixM", 
        "amount": this.amount*100, 
        "currency": "INR",
        "name": "Ravi Online Services",
        "description": this.package+" Membership purchase",
        "image": "assets/images/Onlinestore.png",
        "handler": (response)=>{
            this.savetoDB(response);
            alert("Your Payment Id: "+response.razorpay_payment_id);
            location.reload();
        
        
            
        },
        "prefill": {
            "name": this.userDetails.displayName,
            "email": this.userDetails.email,
            "contact": ""
        },
        "notes": {
            "address": "note value"
        },
        "theme": {
            "color": "#9932CC"
        }
    }
    var propay = new this.winRef.nativeWindow.Razorpay(options);
    propay.open();
}


 savetoDB(response) {
    this.isPaymentDone=true;
    console.log(response+">>>>>>>>>"+this.isPaymentDone);
    localStorage.setItem('ispaymentdone','1');
    localStorage.setItem('package',this.package);
    /*var payRef = firebase.database().ref('payment');

    payRef.child('123456789').set({
    payment_id : response.razorpay_payment_id
    })*/
}
login(data){
    alert('success!!!!');
}

totalAmout(serviceType){
    console.log(serviceType+">>>>>>>>>>")
   if(serviceType=='premium'){
    console.log("entered in premium....")
   this.amount=899;
   this.package="Premium"
   this.pkgImage="assets/images/premium_logo.jpg"
   }
   else{
   console.log("entered in standard....")
   this.amount=499;
   this.package="Standard"
   this.pkgImage="assets/images/standard_logo.png"
   }
}


}
