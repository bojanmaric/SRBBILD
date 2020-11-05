import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/Post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private fb: FormBuilder, private postService: PostService, private snackBar: MatSnackBar) { }

  slika: File = null;
  // picture: string;
  pokazi = false;

  user: any;
  post = this.fb.group({
    userPost: [''],
    userID: [''],
    picture: [''],
    description: ['', [Validators.required]],
    title: ['', [Validators.required]],
    date: [Date.now()],
    video: ['noVideo'],
    category: ['', [Validators.required]]

  })
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  resetForm() {
    this.post.reset;
  }
  onImageAdded(event) {
    this.slika = event.target.files[0];
  }
  add() {

    this.post.patchValue({ userID: this.user._id, userPost: this.user.name });
    if (this.post.valid) {
   
      this.pokazi = true;
      this.postService.addPost(this.post, this.slika).subscribe(
        res => {
          this.pokazi = false;
          this.postService.getAllPosts().subscribe()
          this.snackBar.open('Uspešno dodat Post', 'Close', { duration: 2500 });

        }, error => {
          this.pokazi = false;
          this.snackBar.open('Greska', 'Close', { duration: 2500 });

        }
      );

    } else {
      this.snackBar.open('niste popunili sva polja', 'Close', { duration: 2500 });
    }
  }
}
