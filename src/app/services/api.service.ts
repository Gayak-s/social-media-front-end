import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

   //register
   register(username:any,password:any){
    //req body
    const body = {
      username,
      password
    }
    //make api call to server for register
    return this.http.post('http://localhost:3000/register',body)
  }

    //login
    login(username:any,password:any){
      //req body
      const body = {
        username,
        password
      }
      //api call to server - login
      return this.http.post('http://localhost:3000/login',body)
    }

    // append token in header
    appendToken(){
      //get token from local storage
      let token = localStorage.getItem('token')
      //create http headers
      let headers =new HttpHeaders()
      if (token) {
        headers = headers.append('verify-token',token)
        options.headers = headers
      }
      return options
      }

      // get login user details
      getloginuser(){
        return this.http.get('http://localhost:3000/getuser',this.appendToken())
      }

    // addpost
    addpost(image:any,caption:any){
      const body = {
        image,
        caption
      }
      return this.http.post('http://localhost:3000/postimg',body,this.appendToken())
    }

    // get all posts
    getallpost(){
      return this.http.get('http://localhost:3000/getallposts',this.appendToken())
    }

    // get all users
    getallusers(){
      return this.http.get('http://localhost:3000/getallusers')
    }

    // edit profile
    editprofile(image:any,bio:any){
      const body = {
        image,
        bio
      }
      return this.http.post('http://localhost:3000/editprofile',body,this.appendToken())
    }
}
