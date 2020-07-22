import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class ItemService {

  apiUrl: string;
  options: any;

  itemPicturesUpload:any;


  constructor(private http: HttpClient) {

    this.apiUrl = "http://localhost:52045/api/Item";

    this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set("Authorization", "Bearer " + localStorage.getItem("token")) };
    this.itemPicturesUpload="http://localhost:52045/Uploads/";
  }

  getAllItems(userId,isDiary) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "/GetAll/"+userId+"/" + isDiary, this.options).subscribe(response => {
        resolve(response);
      }, (error => {
        reject(error);
      }))
    })
  }

  getSpecificItem(id, isDiary) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "/GetSpecificItem/" + id + "/" + isDiary, this.options).subscribe(response => {
        resolve(response);
      }, (error => {
        reject(error);
      }))
    })
  }

  addItem(itemInfo, isDiary) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "/AddItem/" + isDiary, JSON.stringify(itemInfo), this.options).subscribe(response => {
        resolve(response);
      }, (error => {
        reject(error);
      }))
    })
  }

  editItem(id, itemInfo, isDiary) {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + "/editItem/" + id + "/" + isDiary, JSON.stringify(itemInfo), this.options).subscribe(response => {
        resolve(response);
      }, (error => {
        reject(error);
      }))
    })
  }


  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
