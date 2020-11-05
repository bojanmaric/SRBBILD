import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import {User}from'../models/User';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authToken:any;
 private user:User;

  noAuthHeader={headers:new HttpHeaders({'NoAuth':'True'}) };
  ruta:string='/api/users';
  constructor(private http:HttpClient) { }

  registerUser(user:User){

    return this.http.post(this.ruta+'/register',user);

  }

  loginUser(user){
    return this.http.post(this.ruta+'/login',user);
  }
  storeUserData(token:string) {
    localStorage.setItem('token', token);

  }
  getToken(){
    return localStorage.getItem('token');
  }

  isLogged() {
    var userPayload=this.getUserPayload();
    if(userPayload){
      return userPayload.exp>Date.now()/1000;
    }
    else{
      return false;
    }
  }
  getUserPayload(){
    var token=this.getToken();
    if(token){
      var userPayload=atob(token.split('.')[1])
      return JSON.parse(userPayload);
    }
    else
      return null;


  }
  getUser():User{
    return JSON.parse(localStorage.getItem('user'))
  }
 
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
  }

}
