import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from '../models/Catalog';
import { Video } from '../models/Videos';

@Injectable({
  providedIn: 'root'
})
export class KataloziSlikeService {

  katalozi:any=[]
  videos:any=[]
  ruta:string = '/api/catalogs/';


  constructor(private router:Router, private httpClient:HttpClient) { }

  ngOnInit(): void {
  }



  public getAllCatalogs():Observable<Catalog[]>{

    return this.httpClient.get<Catalog[]>(this.ruta+'getCatalogs')

  }
  
  public getAllVideos():Observable<Video[]>{

    return this.httpClient.get<Video[]>(this.ruta+'getVideos')

  }
  public addCatalog(katalog,file){
    var body = JSON.stringify(katalog);
    const fData: FormData = new FormData();
    fData.append('katalog', body);
    fData.append('file', file, file.name);
    return this.httpClient.post(this.ruta+'addCatalog',fData)
  }
  
  public addVideo(video){

    return this.httpClient.post(this.ruta+'addVideo',video)
  }

  public deleteCatalog(id, slika){
     this.httpClient.delete(this.ruta+'deleteCatalog/'+id).subscribe()
     return this.httpClient.delete(this.ruta+'brisiImgCataloga/'+slika)

  }

  public deleteVideo(id){
    return this.httpClient.delete(this.ruta+'deleteVideo/'+id)
  }

  public getLastCatalogs(){
    return this.httpClient.get( this.ruta+'getLastTwoCatalogs')
  }
  
  public getLastVideos(){
    return this.httpClient.get(this.ruta+'getLastVideos')
  }

  public setImage(image,file){
    var fdata:FormData=new FormData();

    fdata.append('image',JSON.stringify( image));
    fdata.append('file',file,file.name)

    return this.httpClient.post('/api/images/addPicture',fdata)
  }
  public deleteImg(id){
    return this.httpClient.delete('/api/images/'+id)

  }
  
  public brisiImg(img){
    
    return this.httpClient.delete('/api/images/delImg/'+img)

  }
  public getDailyImage(){
    return this.httpClient.get('/api/images/getDailyImage')
  }
  public getLastDailyImage(){
    return this.httpClient.get('/api/images/getLastDailyImage')
  }

}