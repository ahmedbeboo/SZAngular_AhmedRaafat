import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  loggedIn:boolean;
  apiUrl: string;
  options: any;

  constructor(private http: HttpClient) 
  {
    this.apiUrl = "http://localhost:52045/api/Profile";
    this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
  }

  getAllUsers(){
    return new Promise((resolve,reject)=>{
      this.http.get(this.apiUrl).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }

  public getAllUsers2(): Observable<any[]> 
  { 
    return this.http.get<any[]>(this.apiUrl);
  }

  getSpecificUserInfo(id){
    return new Promise((resolve,reject)=>{
      this.http.get(this.apiUrl+"/"+id).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }

  

  addUser(userInfo){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiUrl,JSON.stringify(userInfo),this.options).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }

  Login(loginModel){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiUrl+"/login",JSON.stringify(loginModel),this.options).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }


  editUser(id,userInfo){
    return new Promise((resolve,reject)=>{
      this.http.put(this.apiUrl+"/"+id,JSON.stringify(userInfo),this.options).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }

  sendConfirmMail(id){
    return new Promise((resolve,reject)=>{
      this.http.get(this.apiUrl+"/sendConfirm/"+id).subscribe(response=>{
        resolve(response);
      },(error=>{
        reject(error);
      }))
    })
  }
}
