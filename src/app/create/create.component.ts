import { ApiserviceService } from '../apiservice.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
// import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  
  // userForm!:FormGroup;

  constructor(private api:ApiserviceService, private route: Router, private router:ActivatedRoute){
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  errMsg: any;
  successMsg:any;
  getparamid: any;
  access:any;
  projects:any;
  file:any;
  userData:any;
  spiner=false;
  erMsg:any;
  sucMsg:any;
  ngOnInit():void{
this.getparamid = this.router.snapshot.paramMap.get('id');
this.access = this.router.snapshot.paramMap.get('access');

if(this.getparamid){


console.log(this.getparamid);
this.api.getSingleData(this.getparamid).subscribe((res)=>{
  console.log(res, 'selected update data');
  this.userForm.patchValue({
    'fullname':res.data[0].fullname,
    'password':res.data[0].password,
    'teamname':res.data[0].teamname,
    'accesslevel':res.data[0].accesslevel
  })
})
this.api.getDistinctProjects(this.getparamid).subscribe((res)=>{
  console.log(res);
  this.projects=res.data;
}
)
}

  }

userForm = new FormGroup({
  'fullname': new FormControl('',Validators.required),
  'password': new FormControl('',Validators.required),
  'teamname': new FormControl('',Validators.required),
  'accesslevel': new FormControl('', Validators.required)

})

adddevice(){
  let ids= this.getparamid;
  let accesslevel= this.access;
  window.location.href=`/adddevice/${ids}/${accesslevel}`
}

changeFile(event:any){
  this.file=event.target.files[0];
  console.log(this.file);
  

}
clickedRegisteredProject(){
  let ids= this.getparamid;
  let accesslevel = this.access;
  window.location.href=`/registerproject/${ids}/${accesslevel}`

}
clickedTopology(){
  let ids= this.getparamid;
  let accesslevel = this.access;
  window.location.href=`/topology/${ids}/${accesslevel}`
  
}
uploadFile(){
  this.spiner=true;
  let errOrsuccessMsg= false;
  if(!this.file){
    errOrsuccessMsg= true;
    this.errMsg="choose a file !";
    this.spiner= false;
  }
  else{
  let fileReader = new FileReader();
  fileReader.readAsBinaryString(this.file);
  fileReader.onload = (e) => {
    var workBook= XLSX.read(fileReader.result, {type:'binary'});
    var sheetNames = workBook.SheetNames;
   

    console.log(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]));

    // if(jsonArray[0].length==4){
    
    this.api.uploadDataFromExcelUser(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])).subscribe((res)=>{
      console.log("uploaded user information");
      this.successMsg="Uploaded !";
      this.spiner=false;
      errOrsuccessMsg= true;

      
    }, (err) => {
      // this.error = err.message;
      console.log(err.message);
      errOrsuccessMsg= true;
      if(err.message=='Http failure response for http://localhost:3000/users/uploadData: 404 Not Found'){
        this.successMsg='no new  user found';
      }
      else if(err.message=='Http failure response for http://localhost:3000/users/uploadData: 401 Unauthorized'){
        this.errMsg='Redundency present in data !';
      }
      else{
      this.errMsg= 'wrong file choosen !';
      }
      this.spiner=false;
      // In this block you get your error message
      // as "Failed to create new user"
  })
    
  
}   
  }
}  
      


// }

clickClose(){
  this.errMsg='';
  this.erMsg='';
  this.sucMsg='';
  this.successMsg= '';
}
  userSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.api.createData(this.userForm.value).subscribe((res)=>{
        this.sucMsg= res.message;
        // console.log("Hello")
      });
      this.userForm.reset();
   
    }
    else{
      this.errMsg = 'All fields are required';
    }
  }
  clickedCart(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/cart/${ids}/${accesslevel}`;
  }
  read(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/read/${ids}/${accesslevel}`;
  }
  clickedUser(){
    let accesslevel= this.access;

    let ids=this.getparamid;
    window.location.href=`/current/${ids}/${accesslevel}`
  }
  getProjectInfo(name:any, id:any){
    let names=name;
    let ids= id;
    let accesslevel= this.access;
    let projectid=id;
    window.location.href=`/project/${ids}/${projectid}/${names}/${accesslevel}`
  }
  adduser(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/create/${ids}/${accesslevel}`
  }
  reserve(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/reserved/${ids}/${accesslevel}`;
  }
  unreserve(){
    let ids=this.getparamid;   
    let accesslevel= this.access;

    window.location.href=`/unreserved/${ids}/${accesslevel}`
  }
  clickedHead(){
    let accesslevel= this.access;

    let ids=this.getparamid;
    window.location.href=`/read/${ids}/${accesslevel}`;
  }

}
