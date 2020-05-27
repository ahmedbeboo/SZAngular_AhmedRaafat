import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/Services/profiles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersList: any;  

  constructor(private profileService: ProfilesService) { }

  ngOnInit() {
    // this.profileService.getAllUsers().then(res => {
    //   this.usersList=res;
    // }).catch(error => {
    // });



    this.profileService.getAllUsers2().subscribe(response => 
    {
        this.usersList = response;
    });

  }

  sendConfirm(id){
    this.profileService.sendConfirmMail(id).then(res => {

    }).catch(error => {
    })
  }


}
