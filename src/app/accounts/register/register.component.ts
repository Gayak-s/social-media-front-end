import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  registerform=this.regfb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z0-9_]*')]],
    pass:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    confpass:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  // showbtn:boolean=true

  constructor(private regfb:FormBuilder, private api:ApiService , private router:Router){
  } 

  register(){
    if (this.registerform.valid) {
      let uname = this.registerform.value.uname
      let pass = this.registerform.value.pass
      let confpass = this.registerform.value.confpass
      if (pass==confpass) {
        this.api.register(uname,pass)
        .subscribe(
          // 200
          (result:any)=>{
          alert(result.message);
          this.router.navigateByUrl('')
          
        },
        // 400
        (result:any)=>{
          alert(result.error.message);
          this.registerform.reset()
      })
      }
      else{
        alert('Invalid Password')
      }
    }
    else{
      alert('Invalid Form')
    }
  }


  // btnEnable(){
  //     let uname = this.registerform.value.uname
  //     let pass = this.registerform.value.pass
  //     let confpass = this.registerform.value.confpass
  //     if (uname && pass && confpass) {
  //       this.showbtn=true
  //     }
  // }
}
