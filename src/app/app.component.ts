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

  // loggedIn: boolean;

  constructor(private profileService: ProfilesService, private navRoter: Router) {

    var sideBar=localStorage.getItem("token");
    if (sideBar !== 'undefined' && sideBar !== null) {
      // this.loggedIn = true;

      this.navRoter.navigate(['/home']);
    }
    else{
      this.navRoter.navigate(['/add']);
    }

    // this.profileService.loggedIn = this.loggedIn;

  }

  logout() {
    // this.loggedIn = false;
    localStorage.removeItem("token");
    this.navRoter.navigate(['/add']);

    this.profileService.loggedIn = false;

  }
}
