import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit{

  image:any
  imgsrc:any
  pfpimgsrc:any
  loginUser:any
  posts:any=[]
  logoutStatus:boolean=false
  postLengthStatus:boolean=false

  postForm = this.fb.group({
    file:['',[Validators.required]],
    caption:['']
  })

  editProfileForm = this.fb.group({
    file:['',[Validators.required]],
    bio:['',[Validators.required]]
  })

  constructor(private fb:FormBuilder , private api:ApiService , private router:Router){
  }


  ngOnInit(): void {

    //validating login
    if (!localStorage.getItem('token')) {
      alert("Please login")
      this.router.navigateByUrl('')
    }

    // get login userdetails
    this.api.getloginuser()
    .subscribe((result:any)=>{
      // 200
      this.loginUser = result.result
      console.log(result);
      console.log(this.loginUser);
      this.posts=this.loginUser.post
      if (this.posts.length==0) {
        this.postLengthStatus = false
      }
      else{
        this.postLengthStatus = true
      }
      console.log(this.postLengthStatus);
      
      
    },
    (result:any)=>{
      //400
      alert(result.error.messege)  
    })
  
  }



  // pfp image event
  uploadpfp(event:any){
    const reader = new FileReader()
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files
      // this.image=file
      reader.readAsDataURL(file)
      reader.onload = ()=>{
        this.pfpimgsrc = reader.result as string
        console.log(this.pfpimgsrc);
      }
    }
  }
  // edit profile
  editprofile(){
    if (this.editProfileForm.valid) {
      let bio = this.editProfileForm.value.bio
      this.api.editprofile(this.pfpimgsrc,bio)
      .subscribe((result:any)=>{
        alert(result.messege)
        location.reload()
      },
      (result:any)=>{
        alert(result.error.messege)
      })
    }
    else{
      alert('Please give valid data')
    }
  }



  // image src event
  uploadImage(event:any){
    const reader = new FileReader()
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files
      this.image=file
      reader.readAsDataURL(file)
      reader.onload = ()=>{
        this.imgsrc = reader.result as string
        // console.log(this.imgsrc);
      }
    }
  }
  // addpost
  addPost(){
    if (this.postForm.valid) {
      let caption = this.postForm.value.caption
      let image = this.imgsrc
      this.api.addpost(image,caption)
      .subscribe((result:any)=>{
        // 200
        alert(result.messege);
        location.reload()
        
      },
      (result:any)=>{
        alert(result.error.messege);
      })
    }
    else{
      alert("Please select a photo")
    }
  }
  
  // logout
  logout(){
    this.logoutStatus = true
    setTimeout(() => {
      this.logoutStatus = false
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      this.router.navigateByUrl('')
    }, 1350);
  }

}
