import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import {MaterialModule} from './material/material.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/home/post/post.component';

import { VideosComponent } from './components/videos/videos.component';
import { ImagesComponent } from './components/images/images.component';
import { AddpostComponent } from './admin/addpost/addpost.component';
import { AddcatalogComponent } from './admin/addcatalog/addcatalog.component';
import { AddimageComponent } from './admin/addimage/addimage.component';
import { AddvideosComponent } from './admin/addvideos/addvideos.component'
import { PostService } from './servisi/post.service';
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import {AuthGuard} from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginService } from './servisi/login.service';
import { CommentviewComponent } from './admin/commentview/commentview.component';
import { CommentDialogComponent } from './components/dialogs/comment-dialog/comment-dialog.component';
import { MagaziniComponent } from './components/magazini/magazini.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CategoryComponent } from './components/category/category.component';
import { KataloziSlikeService } from './servisi/katalozi-slike.service';
import { EditpostComponent } from './components/dialogs/editpost/editpost.component';
import {CdkScrollableModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    PostComponent,
    
    VideosComponent,
    ImagesComponent,
    AddpostComponent,
    AddcatalogComponent,
    AddimageComponent,
    AddvideosComponent,
    LoginComponent,
    RegistrationComponent,
    CommentviewComponent,
    CommentDialogComponent,
    MagaziniComponent,
    CategoryComponent,
    EditpostComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CdkScrollableModule

  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, 
    useClass:AuthInterceptor,
    multi:true
  },PostService,LoginService,KataloziSlikeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
