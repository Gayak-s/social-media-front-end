import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  image: any
  imgsrc: any
  loginUser: any
  posts: any = []
  postsLength: any
  filteredusers: any = []
  logoutStatus: boolean = false
  searchKey:string=''

  postForm = this.fb.group({
    file: ['', [Validators.required]],
    caption: ['']
  })

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }


  ngOnInit(): void {
    
    //validating login
    if (!localStorage.getItem('token')) {
      alert("Please login")
      this.router.navigateByUrl('')
    }
    // get login userdetails
    this.api.getloginuser()
      .subscribe((result: any) => {
        // 200
        this.loginUser = result.result
        // console.log(result);
        // console.log(this.loginUser);

      },
        (result: any) => {
          //400
          alert(result.error.messege)
        })


    // get all posts
    this.api.getallpost()
      .subscribe((posts: any) => {
        //  console.log(posts.result);
        const array = posts.result
        // Based on the value returned by Math.Random,
        // the decision is arbitrarily made whether to return 1 : -1

        const shuffeled = array.reverse()
        // shuffling post array
        // array.sort(() => {
        //   const randomTrueOrFalse = Math.random() > 0.5;
        //   return randomTrueOrFalse ? 1 : -1
        // });

        console.log(shuffeled);
        this.posts = shuffeled
        this.postsLength = this.posts.length
        // console.log(array);
      },
        (result: any) => {
          console.log(result.error);

        })

    // get all users
    this.api.getallusers()
      .subscribe((result: any) => {
        let users = result.result
        // console.log(users); 
        let userToRemove = localStorage.getItem('currentUser');
        // to remove logined user and view rest of users
        this.filteredusers = users.filter((item: any) => item.username !== userToRemove);
        console.log(this.filteredusers);
      })

  }

  uploadImage(event: any) {
    const reader = new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      this.image = file
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imgsrc = reader.result as string
        // console.log(this.imgsrc);

      }
    }
  }

  addPost() {
    if (this.postForm.valid) {
      let caption = this.postForm.value.caption
      let image = this.imgsrc
      this.api.addpost(image, caption)
        .subscribe((result: any) => {
          // 200
          alert(result.messege);
          location.reload()
        },
          (result: any) => {
            alert(result.error.messege);
          })
    }
    else {
      alert("Please select a photo")
    }
  }


  // logout
  logout() {
    this.logoutStatus = true
    setTimeout(() => {
      this.logoutStatus = false
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      this.router.navigateByUrl('')
    }, 1350);
  }


}
