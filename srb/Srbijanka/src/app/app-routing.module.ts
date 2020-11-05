import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/home/post/post.component';
import { VideosComponent } from './components/videos/videos.component';
import { ImagesComponent } from './components/images/images.component';
import { AddpostComponent } from './admin/addpost/addpost.component';
import { AddimageComponent } from './admin/addimage/addimage.component';
import { AddvideosComponent } from './admin/addvideos/addvideos.component';
import { AddcatalogComponent } from './admin/addcatalog/addcatalog.component';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CommentviewComponent } from './admin/commentview/commentview.component';
import { AuthGuard } from './auth/auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { MagaziniComponent } from './components/magazini/magazini.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'post/:id',component:PostComponent},
  {path:'videos',component:VideosComponent},
  {path:'image',component:ImagesComponent},
  {path:'magazini',component:MagaziniComponent},
  {path:'category/:category',component:CategoryComponent},

  {path:'addPost',component:AddpostComponent, canActivate: [AuthGuard] },
  {path:'addImage',component:AddimageComponent, canActivate: [AuthGuard] },
  {path:'addVideo',component:AddvideosComponent, canActivate: [AuthGuard] },
  {path:'addCatalog',component:AddcatalogComponent, canActivate: [AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent, canActivate:[AuthGuard] },
  {path:'commentView',component:CommentviewComponent, canActivate: [AuthGuard]},
  {path:'home',component:HomeComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
