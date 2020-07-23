import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ProfilesService } from './Services/profiles.service';

import { MessageService } from 'primeng/api';
import * as signalR from '@aspnet/signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]

})
export class AppComponent implements OnInit {
  title = 'Cornetelevated';

  userName:any;
  
  constructor(private profileService: ProfilesService, private navRoter: Router,private messageService: MessageService) {

    var sideBar=localStorage.getItem("token");
    if (sideBar !== 'undefined' && sideBar !== null) {

      this.userName=localStorage.getItem("userName");
      this.navRoter.navigate(['/home']);
    }
    else{
      this.navRoter.navigate(['/add']);
    }


  }

  ngOnInit() {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("http://localhost:52045/notify")
      .build();

    connection.start().then(function () {
      console.log('Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (type: string, payload: string) => {
      this.messageService.add({ severity: type, summary: payload, detail: 'Via SignalR' });
    });

  }

  logout() {
    // localStorage.removeItem("token");
    localStorage.clear();
    this.navRoter.navigate(['/add']);

    this.profileService.loggedIn = false;

  }
}
