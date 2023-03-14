import { ApiserviceService } from '../apiservice.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-adddevice',
  templateUrl: './adddevice.component.html',
  styleUrls: ['./adddevice.component.css']
})

export class AdddeviceComponent implements OnInit {

  constructor(private api:ApiserviceService, private route: Router, private router:ActivatedRoute){}
  errMsg: any;
  successMsg:any;
  getparamid: any;
  access:any;
  projects:any;
  file:any;
  arrayBuffer:any;
  uploadData:any;
  spiner:any;
  erMsg:any;
  sucMsg:any;

  ngOnInit():void{
this.getparamid = this.router.snapshot.paramMap.get('id');
this.access = this.router.snapshot.paramMap.get('access');

if(this.getparamid){


console.log(this.getparamid);
this.api.getSingleData(this.getparamid).subscribe((res)=>{
  console.log(res, 'selected update data');
  this.deviceForm.patchValue({
    'rack':res.data[0].rack,
    'unit':res.data[0].unit,
    'devicename':res.data[0].devicename,
    'consoleip':res.data[0].consoleip,
    'consoleport':res.data[0].consoleport,
    'managementip':res.data[0].managementip,
    'powercycleip':res.data[0].powercycleip,
    'powercycleport':res.data[0].powercycleport,
    'teamname':res.data[0].teamname,
    'projectname':res.data[0].projectname

  })
})
this.api.getDistinctProjects(this.getparamid).subscribe((res)=>{
  console.log(res);
  this.projects=res.data;
}
)
}

  }

deviceForm = new FormGroup({
  'rack': new FormControl('',Validators.required),
  'unit': new FormControl('',Validators.required),
  'devicename': new FormControl('',Validators.required),
  'consoleip': new FormControl('', Validators.required),
  'consoleport': new FormControl('',Validators.required),
  'managementip': new FormControl('',Validators.required),
  'powercycleip': new FormControl('',Validators.required),
  'powercycleport': new FormControl('', Validators.required),
  'teamname': new FormControl('',Validators.required),
  'projectname': new FormControl('', Validators.required),
  'serialnumber':new FormControl('', Validators.required),
  'mac':new FormControl('', Validators.required),
  'tg':new FormControl('', Validators.required)


})
  deviceSubmit(){
    
    if(this.deviceForm.valid){
      console.log(this.deviceForm.value);
      this.api.addDevice(this.deviceForm.value).subscribe((res)=>{
        this.sucMsg=res.message;
        // console.log("Hello")
      });
      this.deviceForm.reset();
      
    
    }
    else{
      this.erMsg = 'All fields are required';
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
  changeFile(event:any){
    this.file=event.target.files[0];
    console.log(this.file);
    

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
            
            this.api.uploadDataFromExcel(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])).subscribe((res)=>{
              console.log("uploaded user information");
              this.spiner=false;
              errOrsuccessMsg= true;
  
              this.successMsg="Uploaded !";
            }, (err) => {
              // this.error = err.message;
              console.log(err.message);
              if(err.message=='Http failure response for http://localhost:3000/devices/uploadData: 663 unknown'){
                this.errMsg= 'wrong file chosen !';
              }
              else if(err.message=='Http failure response for http://localhost:3000/devices/uploadData: 404 Not Found'){
                this.successMsg='no new device present !'
              }
              else{
                this.errMsg= 'redundency present in data!';

              }
              errOrsuccessMsg= true;
              this.spiner=false;
              // In this block you get your error message
              // as "Failed to create new user"
          });
            
          
        }   
          }
        }   
        
clickClose(){
  this.errMsg='';
  this.successMsg= '';
}
  adduser(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/create/${ids}/${accesslevel}`
  }
  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/adddevice/${ids}/${accesslevel}`
  }
  reserve(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/reserved/${ids}/${accesslevel}`;
  }
  clickedRegisteredProject(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/registerproject/${ids}/${accesslevel}`

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

