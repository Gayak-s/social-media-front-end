import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts:[],searchKey:string ,propertyname:string): any[] {
    const result:any=[]
    if (!posts || searchKey=='' || propertyname=='') {
      return posts
    }
    
    posts.forEach((user:any)=>{
      let username = user.username
      if (username.includes(searchKey)) {
        result.push(user)
      }
    })


    return result;
  }

}
