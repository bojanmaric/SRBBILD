import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/Post';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {
   ruta:string = '/api/posts';
  dataChange: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
 
  constructor(private httpClient: HttpClient, private router: Router) { }

  public getAllPosts():Observable<Post[]>{
    this.httpClient.get<Post[]>(this.ruta+'/getAll').subscribe(data=>{
      
      this.dataChange.next(data)
    },(error:HttpErrorResponse)=>{
      console.log(error.name+' '+error.message)
    });
  
    return this.dataChange.asObservable();
  }
  public getPostByCategory(category):Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.ruta+'/category/'+category)
  }
  public getPostById(id) {

    return this.httpClient.get(this.ruta + '/getPost/' + id)

  }
  public updatePost(id, post) {

    return this.httpClient.put(this.ruta + '/' + id, post);
  }
  public deletePost(id,img):boolean{
  
    var uspesno=true;
    this.httpClient.delete(this.ruta+'/'+id).subscribe(
      data=>{
        
        
        this.httpClient.delete(this.ruta+'/brisi/'+img).subscribe(
          data=>{
           
            if(data['success']==true){
             
              this.getAllPosts().subscribe();
              return uspesno;
            }
            else{
              return uspesno=false;
            }
          }
        )
      }
    )
    return uspesno
  }
  public addPost(post,file){
    var body=JSON.stringify(post.value);
    const fData:FormData=new FormData();
    fData.append('post',body);
    fData.append('file',file,file.name);
    return this.httpClient.post(this.ruta+'/addPost',fData)
  }
  public addComment(comment){
    
    return this.httpClient.post(this.ruta+'/comment',comment.value)
  }

  public getCommentsByPostID(id){
    return this.httpClient.get(this.ruta+'/getComments/'+id);
  }
  public getBannedComments(){
    return this.httpClient.get(this.ruta+'/getComments');
  }
  public updateComment(id, comment){
    return this.httpClient.put(this.ruta+'/comment/'+id,comment)
  }
  public deleteComment(id){
    return this.httpClient.delete(this.ruta+'/comment/'+id)
  }
}
