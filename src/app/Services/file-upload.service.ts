import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
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
export class FileUploadService {


  apiUrl: any;
  options: any;
  public progress: number;
  public message: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:52045/api/FileUpload";
    this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set("Authorization", "Bearer " + localStorage.getItem("token")) };
  }

  public uploadFile=(newFileName,file)=>{

    const formData=new FormData();
    formData.append('file',file,file.name);

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+"/"+newFileName, formData,{headers:this.options,reportProgress:true,observe:'events'}).subscribe(response => {

        if(response.type===HttpEventType.UploadProgress)
        {
          console.log(this.progress=Math.round(100*response.loaded/response.total));
        }
        else if(response.type===HttpEventType.Response)
        {
          console.log(this.message='Upload Success.');
        }


      }, (error => {
        reject(error);
      }))
    })

  }
}
