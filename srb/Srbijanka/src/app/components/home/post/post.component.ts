import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostService } from 'src/app/servisi/post.service';
import { Post } from 'src/app/models/Post';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import {DomSanitizer}from '@angular/platform-browser'
import {Title, Meta}from '@angular/platform-browser';
import { strict } from 'assert';


declare var $:any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //ruta: string = 'http://localhost:3000/api/posts/image/';
  ruta: string = '/api/posts/image/';


  constructor(private titleService:Title, private meta: Meta, private actiRoute:ActivatedRoute, private trenutnaRuta:Router,private postService:PostService, private fb:FormBuilder, private snackBar:MatSnackBar, private domSanitizer:DomSanitizer) { }

  comment=this.fb.group({
    postID:['',[Validators.required]],
    name:['',[Validators.required]],
    content:['',Validators.required],
    banned:[true],
    date:[Date.now()]
  })
  comments:Array<Comment[]>=new Array<Comment[]>();

  id:any;
  ngOnInit(): void {

    



    this.loadPost();
  }
  post:Post;

  loadPost(){
    this.actiRoute.paramMap.subscribe((params:ParamMap)=>{

      this.id=params.get('id');
      this.postService.getPostById(this.id).subscribe(data=>{
        this.post=data['post'];

        this.titleService.setTitle(this.post.title);
        this.meta.updateTag({name:'description',content:this.post.description.substr(0,100)+' ...'})
        this.meta.updateTag({property:'og:description',content:  this.post.description.substr(0,100)+' ...'})
       // this.meta.removeTag("property='og:title'")
        this.meta.updateTag({property:'og:title',content: this.post.title})
        this.meta.updateTag({property:'og:type',content:'article'})

        this.meta.updateTag({property:'og:url',content:window.location.href})

        this.meta.updateTag({name:'author',content:this.post.userPost})
        this.meta.updateTag({property:'og:image',content:'https://www.magazinsrbijanka.rs'+ this.getImage(this.post.picture)});
        this.meta.updateTag({name:'image',content:'https://www.magazinsrbijanka.rs'+this.getImage(this.post.picture)});


        
        this.postService.getCommentsByPostID(this.id).subscribe(data2=>{
          this.comments=data2['comments'];
        })

        
      },error=>{
        console.log(error)
      })


    })

  }
  getVideo(video){

    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video)

  }
  postComment(){
    this.comment.patchValue({'postID':this.post._id,'banned':true})
    if(this.comment.valid){
      this.postService.addComment(this.comment).subscribe(
        data=>{
          if(data['success']===true){
            this.snackBar.open('Uspesno ste dodali komentar',"UREDU",{duration:1400});
            $('.commentForm').hide();
            $('.commentSuccess').show();
           
          }
        }
      )
    }
  }
  getImage(img){
    return this.ruta+img

  }
}
