// import { Component , OnInit} from '@angular/core';
// import { ApiserviceService } from '../apiservice.service';
// import { Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   constructor(private api:ApiserviceService,  private router: Router){ }
//   // apiservice!:ApiserviceService;
//   login:any;
//   successMsg:any;
//   errMsg:any;
//   ngOnInit():void{
  

//   }
//   userForm = new FormGroup({
//     'username': new FormControl('',Validators.required),
//     'password': new FormControl('',Validators.required),
    
  
//   })
//   userSubmit(){
//     if(this.userForm.valid){
//       console.log(this.userForm.value);
//       this.api.checkData(this.userForm.value).subscribe((res)=>{
//         let ids = res.data[0].id;
//         let access= res.data[0].accesslevel;
//         this.router.navigate([`/read/${ids}/${access}`]);
        
//       });
//       this.userForm.reset();

      
  
//     }
//     else{
//       this.errMsg = 'Wrong credentials';
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import {bycryptjs} from 'bcryptjs';
@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!:string;
  password!:string;
   errMsg:any;
   constructor(private authService : AuthService, private router : Router) { }

   ngOnInit() {
      // getHeight();
   }
   userForm = new FormGroup({
        'username': new FormControl('',Validators.required),
        'password': new FormControl('',Validators.required),
      })
   onClickSubmit() {
      if(this.userForm.valid){
      
      
      let findUser = 'no';
      this.authService.login(this.userForm.value)
         .subscribe( res => { 
          findUser = 'yes';
          let ids = res.data[0].id;
          let access= res.data[0].accesslevel;
          // const isEqual =  bcryptjs.compare(this.userForm.value.password,'welcome123');
          if(this.userForm.value.password=='welcome123'){
           // change the password page
           this.router.navigate([`/changepassword/${ids}/${access}`])
          }
          else{
           this.router.navigate([`/read/${ids}/${access}`]); 
          }
        
      });
      if(findUser=='no'){

          setTimeout(() => 
        {
         
         
            this.errMsg= "username or password wrong!";
          }
        
        ,3000);
      }
    }
    else{
      this.errMsg='all fields are required';
    }
   }
   clickClose(){
      this.errMsg='';
    }
}
