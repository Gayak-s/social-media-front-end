import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginSpinnerStatus:Boolean=false
  loginFaild:any
  loginFailedStatus:boolean=false

  loginForm = this.loginfb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z0-9_]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private loginfb:FormBuilder , private router:Router , private api:ApiService){}

  login(){
    if (this.loginForm.valid) {
      let uname = this.loginForm.value.username
      let pass = this.loginForm.value.password

      this.api.login(uname,pass)
      .subscribe(
        // 200
        (result:any)=>{
          console.log(result);
          //store current user in local storage
          localStorage.setItem('currentUser',result.currentUser)
          //store token in local storage
          localStorage.setItem('token',result.token)
          this.loginSpinnerStatus = true
          setTimeout(() => {
            this.router.navigateByUrl('dashboard')
          }, 1500);
        },
        // 400
        (result:any)=>{
          this.loginFaild=result.error.message
          this.loginFailedStatus=true
          setTimeout(() => {
            this.loginForm.reset()
            this.loginFailedStatus=false
          }, 2000);
          
        }
      )


      // this.router.navigateByUrl('/dashboard')
    }
    else{
      alert('Please enter Username and Password')
    }
  }

}
