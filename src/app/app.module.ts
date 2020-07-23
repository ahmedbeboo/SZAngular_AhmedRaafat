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
import { PersonalDiaryAddComponent } from './Components/personalDiary/personal-diary-add/personal-diary-add.component';
import { ToDoComponent } from './Components/TODO/to-do/to-do.component';
import {NgxPaginationModule} from 'ngx-pagination';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

// routing
const routes: Routes = [
  { path: 'home', component:HomeComponent },
  { path: 'add', component:AddUserComponent },
  {path:'addDiary',component:PersonalDiaryAddComponent},
  { path: 'editDiary/:id', component:PersonalDiaryAddComponent },
  {path:'addToDo',component:ToDoComponent},
  { path: 'editToDo/:id', component:ToDoComponent },
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
    NotfoundComponent,
    PersonalDiaryAddComponent,
    ToDoComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
