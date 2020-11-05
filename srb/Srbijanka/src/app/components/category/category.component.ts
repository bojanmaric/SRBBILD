import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/Post';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/servisi/login.service';
import { MatDialog } from '@angular/material/dialog';
import { EditpostComponent } from '../dialogs/editpost/editpost.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private logingService:LoginService,private dialogRef:MatDialog, private actiRoute:ActivatedRoute, private router:Router,private postService:PostService,private snackBar:MatSnackBar) { }

  posts:Post[];
  kategorija='';
  p:any;
  progres=false;
  ruta:string='/api/posts/image/'
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.progres=true;
    this.actiRoute.paramMap.subscribe((params:ParamMap)=>{
      this.kategorija=params.get('category')

      this.postService.getPostByCategory(this.kategorija).subscribe(
        data=>{
          this.posts=data['posts']
          this.progres=false;
         
        }
      )
        
      
    })
  }

  getImage(img){
    return this.ruta+img
  }

  deletePost(post){
    
   
    const uspesno = this.postService.deletePost(post._id,post.picture);
    
    if(uspesno){
      this.snackBar.open('uspesno ste izbrisali post','OK',{duration:1500})
      this.loadData();
    }else{
      this.snackBar.open('Doslo je do greske','OK',{duration:1500})

    }
    this.loadData();
  }

  goTop(){
    document.querySelector('mat-sidenav-content').scrollTop = 0;
  }
  editPost(post:Post){
    const dialogReff=this.dialogRef.open(EditpostComponent,{data:post})

    dialogReff.afterClosed().subscribe(
      result=>{
        this.loadData();
      }
    )
  }
  openPost(id){
    this.router.navigate(['/post/'+id])

  }
  
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }

}
