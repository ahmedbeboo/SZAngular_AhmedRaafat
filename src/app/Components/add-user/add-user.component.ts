import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";  
import { Router } from "@angular/router";  
import { ProfilesService } from 'src/app/Services/profiles.service';
import { userInfo } from 'src/app/Entities/userInfo';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  userInfo:any;

  formlabelSignup:string;  
  formlabelSignin:string;  

  formbtn:string ;  

  id:any="";
  addForm:FormGroup;
  loginForm:FormGroup;  
  

  btnvisibility:boolean;  

  constructor(private router:ActivatedRoute,private profileService: ProfilesService,private navRoter:Router)
  {
    this.btnvisibility=true;
    this.formlabelSignup="Sign up";
    this.formlabelSignin="Login";

    this.formbtn="Register";
    this.id= this.router.snapshot.params['id'];

    this.addForm = new FormGroup({       
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phoneNumber: new FormControl('', [Validators.required,Validators.pattern("[0-9 ]{11}")]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)])
    });

    this.loginForm = new FormGroup({          
      emailLogin: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      passwordLogin: new FormControl('', [Validators.required,Validators.minLength(8)])
    });

  }

  ngOnInit() {
    // if (this.router.snapshot.params['id']) {
    //   //do your stuff. example: console.log('id: ', this.route.snapshot.queryParams['id']);
      
    //   if(this.id!=""){

    //     this.profileService.getSpecificUserInfo(this.id).then(res => {
    //       this.addForm.patchValue(res);  
    //     }).catch(error => {
    //     });
 
    //     this.btnvisibility = false;  
    //     this.formlabelSignup = 'Edit User Info';  
    //     this.formbtn = 'Update';
    //   }
      
    // }
    
  
    
  }

  back(){
    this.navRoter.navigate(['/home']);
  }

  onSubmit() {  
    console.log('Create fire');
    this.profileService.addUser(this.addForm.value).then(res => {
      this.userInfo= res;

      localStorage.setItem ('token', this.userInfo.token);
      localStorage.setItem('userId',this.userInfo.id);
      localStorage.setItem('userName',this.userInfo.firstName+" "+this.userInfo.lastName);


      this.navRoter.navigate(['/home']);
    }).catch(error => {
      alert("Can't Sign up");  
    });  
  }
  
  login() {  
    console.log('Login fire');
    this.profileService.Login(this.loginForm.value).then(res => {
      this.userInfo= res;
      localStorage.setItem ('token', this.userInfo.token);
      localStorage.setItem('userId',this.userInfo.id);
      localStorage.setItem('userName',this.userInfo.firstName+" "+this.userInfo.lastName);


      this.navRoter.navigate(['/home']);
    }).catch(error => {
      alert("Can't Login");  
    });  
  }

  
  onUpdate() {  
    console.log('Update fire');  
    this.profileService.editUser(this.id,this.addForm.value).then(res => {
      this.navRoter.navigate(['/home']);
    }).catch(error => {
      alert(error);  
    });
  }
}
