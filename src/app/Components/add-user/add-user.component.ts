import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";  
import { Router } from "@angular/router";  
import { ProfilesService } from 'src/app/Services/profiles.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formlabel:string;  
  formbtn:string ;  

  id:any="";
  addForm:FormGroup;  
  btnvisibility:boolean;  

  constructor(private router:ActivatedRoute,private profileService: ProfilesService,private navRoter:Router)
  {
    this.btnvisibility=true;
    this.formlabel="Add User";
    this.formbtn="Save";
    this.id= this.router.snapshot.params['id'];

    this.addForm = new FormGroup({  
      
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phoneNumber: new FormControl('', [Validators.required,Validators.pattern("[0-9 ]{11}")]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)])
    });


  }

  ngOnInit() {
    if (this.router.snapshot.params['id']) {
      //do your stuff. example: console.log('id: ', this.route.snapshot.queryParams['id']);
      
      if(this.id!=""){

        this.profileService.getSpecificUserInfo(this.id).then(res => {
          this.addForm.patchValue(res);  
        }).catch(error => {
        });
 
        this.btnvisibility = false;  
        this.formlabel = 'Edit User Info';  
        this.formbtn = 'Update';
      }
      
    }
    
  
    
  }

  back(){
    this.navRoter.navigate(['/home']);
  }

  onSubmit() {  
    console.log('Create fire');
    this.profileService.addUser(this.addForm.value).then(res => {
      this.navRoter.navigate(['/home']);
    }).catch(error => {
      alert(error);  
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
