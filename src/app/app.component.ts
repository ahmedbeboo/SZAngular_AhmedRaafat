import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ProfilesService } from './Services/profiles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cornetelevated';

  userName:any;
  
  constructor(private profileService: ProfilesService, private navRoter: Router) {

    var sideBar=localStorage.getItem("token");
    if (sideBar !== 'undefined' && sideBar !== null) {

      this.userName=localStorage.getItem("userName");
      this.navRoter.navigate(['/home']);
    }
    else{
      this.navRoter.navigate(['/add']);
    }


  }

  logout() {
    // localStorage.removeItem("token");
    localStorage.clear();
    this.navRoter.navigate(['/add']);

    this.profileService.loggedIn = false;

  }
}
