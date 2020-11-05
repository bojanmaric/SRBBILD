import { Component, OnInit } from '@angular/core';
import { KataloziSlikeService } from 'src/app/servisi/katalozi-slike.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcatalog',
  templateUrl: './addcatalog.component.html',
  styleUrls: ['./addcatalog.component.css']
})
export class AddcatalogComponent implements OnInit {

  constructor(private katService:KataloziSlikeService, private snackBar:MatSnackBar, private fb:FormBuilder) { }

  ngOnInit(): void {

  }
  file:File=null;

  katalog= this.fb.group({
    link:['',[Validators.required]],
    name:['',[Validators.required]],
    srcSlika:[''],
    date:[Date.now()]
    
  })

  onImageAdded(event){
    this.file=event.target.files[0];
  }
  addKatalog(){
    if(this.katalog.valid){
      this.katService.addCatalog(this.katalog.value,this.file).subscribe(
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
