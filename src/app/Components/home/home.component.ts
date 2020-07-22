import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/Services/profiles.service';
import { ItemService } from 'src/app/Services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList: any;
  diaryList: any;

  usersList: any;
  isDiary: true;
  isToDo: true;

  imagesURL:any;

  constructor(private profileService: ProfilesService, private itemService: ItemService) { 

    this.imagesURL=itemService.itemPicturesUpload;
  }

  ngOnInit() {
    // this.profileService.getAllUsers().then(res => {
    //   this.usersList=res;
    // }).catch(error => {
    // });

    let item = localStorage.getItem('userId');

    this.itemService.getAllItems(item,true).then(res => {
      this.diaryList = res;
    }).catch(error => {
    })

    this.itemService.getAllItems(item,false).then(res => {
      this.todoList = res;
    }).catch(error => {
    })


    this.profileService.getAllUsers2().subscribe(response => {
      this.usersList = response;
    });

  }

  sendConfirm(id) {
    this.profileService.sendConfirmMail(id).then(res => {

    }).catch(error => {
    })

  }


}
