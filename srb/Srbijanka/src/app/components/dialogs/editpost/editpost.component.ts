import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/servisi/post.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  constructor(public snackBar:MatSnackBar, public dialogRef:MatDialogRef<EditpostComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Post,
    public postService:PostService) { }


  ngOnInit(): void {
  
  }

  public update(){
    this.postService.updatePost(this.data._id, this.data).subscribe(
      data=>{
        if(data['success']==true){
          this.snackBar.open('Uspesno ste izmenili post','Uredu',{duration:1500})
          this.dialogRef.close()
        }
      },err=>{
        this.snackBar.open('Doslo je do greske na serveru','Uredu',{duration:1500})
      }
    )
  }
  public cancel(){
    this.snackBar.open('Odustali ste','Uredu',{duration:1500})

    this.dialogRef.close()
  }
}
