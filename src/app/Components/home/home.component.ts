import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/Services/profiles.service';
import { ItemService } from 'src/app/Services/item.service';

import { PageResult } from 'src/app/Entities/PageResult';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pageNumber: number = 1;
  public Count: number;

  todoList: any;
  diaryList: any;

  usersList: any;
  isDiary: true;
  isToDo: true;

  imagesURL: any;

  options: any;

  constructor(private http: HttpClient, private profileService: ProfilesService, private itemService: ItemService) {
    this.options = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set("Authorization", "Bearer " + localStorage.getItem("token"));
    this.imagesURL = itemService.itemPicturesUpload;
  }

  ngOnInit() {
    // this.profileService.getAllUsers().then(res => {
    //   this.usersList=res;
    // }).catch(error => {
    // });

    let item = localStorage.getItem('userId');

    this.http.get<PageResult<any>>("http://localhost:52045/api/Item/GetAllPaging/" + this.pageNumber + "/" + item + "/" + false,{headers:this.options}).subscribe(result => {
      this.todoList = result.items;
      this.pageNumber = result.pageIndex;
      this.Count = result.count;
    }, error => console.error(error));

    this.http.get<PageResult<any>>("http://localhost:52045/api/Item/GetAllPaging/" + this.pageNumber + "/" + item + "/" + true,{headers:this.options}).subscribe(result => {
      this.diaryList = result.items;
      this.pageNumber = result.pageIndex;
      this.Count = result.count;
    }, error => console.error(error));


    // this.itemService.getAllItems(item,true).then(res => {
    //   this.diaryList = res;
    // }).catch(error => {
    // })

    // this.itemService.getAllItems(item,false).then(res => {
    //   this.todoList = res;
    // }).catch(error => {
    // })


    // this.profileService.getAllUsers2().subscribe(response => {
    //   this.usersList = response;
    // });

  }

  sendConfirm(id) {
    this.profileService.sendConfirmMail(id).then(res => {

    }).catch(error => {
    })

  }


  public onPageChangeToDo = (pageNumber) => {
    let item = localStorage.getItem('userId');

    this.http.get<PageResult<any>>("http://localhost:52045/api/Item/GetAllPaging/" + pageNumber + "/" + item + "/" + false,{headers:this.options}).subscribe(result => {
      this.todoList = result.items;
      this.pageNumber = result.pageIndex;
      this.Count = result.count;
    }, error => console.error(error));
  }

  public onPageChangeDiary = (pageNumber) => {
    let item = localStorage.getItem('userId');

    this.http.get<PageResult<any>>("http://localhost:52045/api/Item/GetAllPaging/" + pageNumber + "/" + item + "/" + true,{headers:this.options}).subscribe(result => {
      this.todoList = result.items;
      this.pageNumber = result.pageIndex;
      this.Count = result.count;
    }, error => console.error(error));
  }
}
