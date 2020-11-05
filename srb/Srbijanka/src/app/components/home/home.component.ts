import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servisi/login.service';
import { KataloziSlikeService } from 'src/app/servisi/katalozi-slike.service';
import { Image } from 'src/app/models/Image';
import { MatDialog } from '@angular/material/dialog';
import { EditpostComponent } from '../dialogs/editpost/editpost.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ruta: string = '/api/posts/image/';

  p:any;
  constructor(private logingService:LoginService,
    private katSlikeService:KataloziSlikeService ,
    private postService: PostService, private snackBar: MatSnackBar, 
    private router:Router, private matDialog:MatDialog) { 
    
  }

   public posts:any=[];

   public dailyImg:Image=null;
  ngOnInit() {
  
    this.loadData();
    this.getDailyImage();
  }
  getDailyImage(){
    
    this.katSlikeService.getLastDailyImage().subscribe(
      data=>{
        this.dailyImg=data['image'];
      
        
      },err=>{
        console.log(err)
      }
    )

  }
  showDailyImage(){
   
    return '/api/images/'+this.dailyImg.srcSlika
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
  editPost(post:Post){
    const dialogRef=this.matDialog.open(EditpostComponent,{data:post})

    dialogRef.afterClosed().subscribe(
      result=>{
        this.loadData();
      }
    )
  }

  openPost(id){
    this.router.navigate(['/post/'+id])

  }
  loadData(){
    this.posts =  this.postService.getAllPosts();
    if (this.posts.lenght == 0) {

      this.loadData();
      this.getDailyImage();
    }
    
  }
  getImage(img){
    return this.ruta+img

  }
  goTop(){
    document.querySelector('mat-sidenav-content').scrollTop = 0;
  }
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }
}
