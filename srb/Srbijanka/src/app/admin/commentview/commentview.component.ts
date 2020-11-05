import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from 'src/app/components/dialogs/comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-commentview',
  templateUrl: './commentview.component.html',
  styleUrls: ['./commentview.component.css']
})
export class CommentviewComponent implements OnInit {

  constructor(private postService:PostService, private snackBar:MatSnackBar,private matDialog:MatDialog) { }

  comments:Comment[]=[];
  ngOnInit(): void {
    this.loadComments();
  }
  loadComments(){
    this.postService.getBannedComments().subscribe(
      data=>{
        this.comments=data['comments']
      
      }
    );

  }
  updateComment(comment:Comment){
    const dialog=this.matDialog.open(CommentDialogComponent,{data:comment})

    dialog.afterClosed().subscribe(result => {
     
        this.loadComments();
      
    })
  }

  deleteComment(id){
    this.postService.deleteComment(id).subscribe(
      data=>{
        this.snackBar.open(data['msg'],"Uredu",{duration:1500})
        this.loadComments();
      },err=>{
        console.log(err)
      }
    )
  }
}
