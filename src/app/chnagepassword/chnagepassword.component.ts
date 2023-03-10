import { ApiserviceService } from './../apiservice.service';

import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-chnagepassword',
  templateUrl: './chnagepassword.component.html',
  styleUrls: ['./chnagepassword.component.css']
})
export class ChnagepasswordComponent implements OnInit{
  username!:string;
  password!:string;
  getparamid:any;
  successMsg:any;
  accesslevel : any;
  // errMsg:any;
   errMsg:any;
   constructor(private authService : AuthService,private apiservice :ApiserviceService , private router : Router, private route:ActivatedRoute) { }
   ngOnInit() {
      // getHeight();
      this.getparamid = this.route.snapshot.paramMap.get('id');
      this.accesslevel= this.route.snapshot.paramMap.get('access');

   }
   userForm = new FormGroup({
        'newpassword': new FormControl('',Validators.required),
        'confirmpassword': new FormControl('',Validators.required),
      })
   onClickSubmit() {
    console.log(this.userForm.value);
      if(this.userForm.valid){
        if(this.userForm.value.newpassword== this.userForm.value.confirmpassword){
          let data={
            password:this.userForm.value.newpassword,
            userId:this.getparamid
          }
        
          this.authService.updatePassword(data).subscribe((res)=>{
            this.successMsg= res.message;
           
          })
          let ids= this.getparamid;
          let access= this.accesslevel;
          this.router.navigate([`/read/${ids}/${access}`]);

        }
        else{
          this.errMsg= 'password not matched !';
        }
    }
    else{
      this.errMsg='All fields are required'
    }
   
   }
   clickClose(){
      this.errMsg='';
    }
}
