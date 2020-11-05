import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { KataloziSlikeService } from 'src/app/servisi/katalozi-slike.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addvideos',
  templateUrl: './addvideos.component.html',
  styleUrls: ['./addvideos.component.css']
})
export class AddvideosComponent implements OnInit {

  constructor(private katService:KataloziSlikeService, private snackBar:MatSnackBar, private fb:FormBuilder) { }

  ngOnInit(): void {

  }

  video= this.fb.group({
    link:['',[Validators.required]],
    description:['',[Validators.required]],
    
    date:[Date.now()]
    
  })

  addVideo(){
    if(this.video.valid){
      this.katService.addVideo(this.video.value).subscribe(
        res=>{
          this.snackBar.open('Uspesno ste dodali','Close',{duration:1500})
        },error=>{
          this.snackBar.open('Greska na serveru', 'Close', { duration: 2500 });

        }
      )
 
    }else{
      this.snackBar.open('Niste popunili neophodna polja','Uredu')
    }
  }
}
