import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalog } from 'src/app/models/Catalog';
import { LoginService } from 'src/app/servisi/login.service';
import { KataloziSlikeService } from 'src/app/servisi/katalozi-slike.service';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-magazini',
  templateUrl: './magazini.component.html',
  styleUrls: ['./magazini.component.css']
})
export class MagaziniComponent implements OnInit {

  katalozi:Catalog[];
  constructor(private logingService:LoginService,private katSlikeService:KataloziSlikeService,private postService: PostService, private snackBar: MatSnackBar) { }
  ruta: string = '/api/catalogs/image/';

  p:any;
  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.katSlikeService.getAllCatalogs().subscribe(
      data=>{
        this.katalozi=data['catalogs']
        
      }
    )
  }
  
  goTop(){
    document.querySelector('mat-sidenav-content').scrollTop = 0;
  }

  deleteMagazin(id,slika){
    this.katSlikeService.deleteCatalog(id,slika).subscribe(
      data=>{
        
          this.loadData();
          this.snackBar.open("Uspesno obrisan magazin",'Uredu',{duration:1500})
        
      },err=>{
        this.snackBar.open("Doslo je do greske na serveru",'Uredu',{duration:1500})

      }
    )
  }
  getImage(img){
    return this.ruta+img
  }
  
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }
}
