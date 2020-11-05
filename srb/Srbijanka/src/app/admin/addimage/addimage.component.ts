import { Component, OnInit } from '@angular/core';
import { KataloziSlikeService } from 'src/app/servisi/katalozi-slike.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { Image } from 'src/app/models/Image';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent implements OnInit {

  constructor(private katService: KataloziSlikeService, private snackBar: MatSnackBar, private fb: FormBuilder) { }

  img: Image;
  ngOnInit(): void {
    this.loadImg();
  }
  file: File = null;

  image = this.fb.group({
    srcSlika: [''],
    description: [''],
    date: [Date.now()]

  })

  loadImg() {
    this.katService.getLastDailyImage().subscribe(data => {
      this.img = data['image'];
  
    })
  }
  onImageAdded(event) {
    this.file = event.target.files[0];
  }
  addImage() {
    if (this.image.valid) {

      this.katService.setImage(this.image.value, this.file).subscribe(
        ress => {

          if(ress['success']==true){

            this.snackBar.open('Uspesno ste dodali', 'Close', { duration: 1500 })

            if(this.img._id!=''){
              this.katService.deleteImg(this.img._id).subscribe(
                data => {
                  
                  if (data['success'] == true) {
               
                    this.katService.brisiImg(this.img.srcSlika).subscribe(
                      data=>{
                        this.loadImg()
                      }
                    )
                  }
                }
              )
            }
          }
        }, error => {
          this.snackBar.open('Greska na serveru', 'Close', { duration: 2500 });

        }
      )

    } else {
      this.snackBar.open('Niste popunili neophodna polja', 'Uredu')
    }
  }




}
