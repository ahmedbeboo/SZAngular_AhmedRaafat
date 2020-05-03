import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { UserInfoComponent } from './Components/user-info/user-info.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './Components/notfound/notfound.component';


// routing
const routes: Routes = [
  { path: 'home', component:HomeComponent },
  { path: 'add', component:AddUserComponent },
  { path: 'edit/:id', component:AddUserComponent },
  { path: 'userInfo', component:UserInfoComponent },
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: '**', component:NotfoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    UserInfoComponent,
    NotfoundComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
