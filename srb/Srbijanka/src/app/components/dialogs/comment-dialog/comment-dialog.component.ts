import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/servisi/post.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  constructor(public snackBar:MatSnackBar, public dialogRef:MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public postService:PostService) { }

  ngOnInit(): void {
 
  }
  public update(){
    this.postService.updateComment(this.data._id,this.data).subscribe(
    data=>{
      this.snackBar.open('uspsno ste izmenili',"uredu",{duration:1500});
      this.dialogRef.close()
    },err=>{
      console.log(err);
      this.snackBar.open('Doslo je do greske na serveru',"uredu",{duration:1500});
    })

  }
  public cancel():void{
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", { duration: 1000 });
  }

}
