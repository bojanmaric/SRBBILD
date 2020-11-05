import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../servisi/login.service';
import { Router } from '@angular/router';
import { KataloziSlikeService } from '../servisi/katalozi-slike.service';
import { Image } from '../models/Image';
import { Catalog } from '../models/Catalog';
import { Video } from '../models/Videos';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private titleService:Title, private meta: Meta ,private katSlikeService:KataloziSlikeService,
    private breakpointObserver: BreakpointObserver, 
    private logingService:LoginService, 
    private router:Router,
    public domSanitizer:DomSanitizer) {}

  catalogs:Catalog[]=[];
  videos:Video[]=[];
 
  
//  ruta:string="http://localhost:3000/api/catalogs/image/"
  ruta:string="/api/catalogs/image/"

  ngOnInit(){
    this.titleService.setTitle("Magazin srbijanka");
    this.loadCatalogs();
    this.loadVideos();

  }
  onActivate(event){
   this.titleService.setTitle('MAGAZIN SRBIJANKA | SRBIJANKA');
    this.meta.updateTag({name:'description', content:'Srbijanka'})
    

    this.meta.removeTag('name=description')
    this.meta.removeTag('name=image')
    this.meta.removeTag("property='og:image'")
    this.meta.removeTag("property='og:url'")
    this.meta.removeTag("property='og:description'")
    this.meta.removeTag("property='og:title'")
    this.meta.removeTag("property='og:type'")
    this.meta.removeTag("name=HandheldFriendly")



    this.meta.removeTag("name='author'")
    this.meta.removeTag("name='description'")

    document.querySelector('mat-sidenav-content').scrollTop = 0;
  }
  loadCatalogs(){
    this.katSlikeService.getLastCatalogs().subscribe(
      data=>{
        this.catalogs=data['catalogs']
       
      }
    )
  }

  loadVideos(){
    this.katSlikeService.getLastVideos().subscribe(
      data=>{
        this.videos=data['videos'];
        
      }
    )
  }
  getVideo(link){
    
    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+link)

  }
  logout() {
    this.logingService.logout();
    this.router.navigate(['/login']);
  }

  getCatalogImg(srcSlika){
    return   this.ruta+srcSlika
  }
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }

  
}
