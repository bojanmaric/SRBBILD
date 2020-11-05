import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import {Router} from '@angular/router';
import {LoginService }from '../servisi/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService:LoginService, private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(!this.loginService.isLogged()){
        this.router.navigateByUrl('/login');
        this.loginService.logout();
        return false;
      }
      
    
    return true;
  }
  
}
