import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registerproject',
  templateUrl: './registerproject.component.html',
  styleUrls: ['./registerproject.component.css']
})
export class RegisterprojectComponent implements OnInit{

  constructor(private apiservice:ApiserviceService, private router:ActivatedRoute,  private route: Router){ }
  // apiservice!:ApiserviceService;
  getparamid: any;
  reservedata:any;
  userData:any;
  projects:any;
  getuserid:any;
  access:any;
  errMsg:any;
  successMsg:any;
  teamMembers:any;
  taken:any;
  ngOnInit():void{
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.access= this.router.snapshot.paramMap.get('access');
    
    this.apiservice.getAllTeamMembers(this.getparamid, this.access).subscribe((res)=>{
      this.teamMembers= res.data;
      console.log("team Members data", res);
    })
   
    this.apiservice.getDistinctProjects(this.getparamid).subscribe((res)=>{
      this.projects=res.data;
    })
   
  
    
  }
  projectDetailsForm = new FormGroup({
    'projectname': new FormControl('',Validators.required),
    'teamname': new FormControl('', Validators.required),
    'type': new FormControl('', Validators.required)
  })
  
  read(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    this.route.navigate([`/read/${ids}/${accesslevel}`]);
  }
 
  
  reserve(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    this.route.navigate([`/reserved/${ids}/${accesslevel}`]);
  }
  clickClose(){
    this.errMsg= '';
    this.successMsg='';
  }
   
  projectSubmit(){
    if(this.projectDetailsForm.valid){
      // let err=false;
      
      let data={
        projectname:this.projectDetailsForm.value.projectname,
        teamname:this.projectDetailsForm.value.teamname,
        type:this.projectDetailsForm.value.type
      }
      this.successMsg= ' Registered !'
        this.apiservice.registerProject(data).subscribe((res)=>{
            console.log(res.data);
            
        }, (err)=>{
          this.taken= 'yes';
          this.successMsg= '';
          this.errMsg= "Project name already taken";
        })
    }
    else{
      this.errMsg='All fields are required !'
    }
  }

  clickedTopology(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    this.route.navigate([`/topology/${ids}/${accesslevel}`])
    
  }  
clickedCart(){
  let ids= this.getparamid;
  let accesslevel= this.access;
  this.route.navigate([`/cart/${ids}/${accesslevel}`]);
}
clickedRegisteredProject(){
  let ids= this.getparamid;
  let accesslevel = this.access;
  window.location.href=`/registerproject/${ids}/${accesslevel}`

}
  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    this.route.navigate([`/adddevice/${ids}/${accesslevel}`])
  }
 
  clickedMoreInformation(id:any){
    let memberId= id;
    let accessLevel = this.access;
    let userId = this.getparamid;
    this.route.navigate([`/team/${userId}/${accessLevel}/${memberId}`])
  }
  unreserve(){
    let ids=this.getparamid;   
    let accesslevel= this.access;

    this.route.navigate([`/unreserved/${ids}/${accesslevel}`])
  }
  adduser(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    this.route.navigate([`/create/${ids}/${accesslevel}`])
  }
  clickedunreserved(id:any){
    let ids=id;
    let accesslevel= this.access;

    let userid= this.getparamid;
    this.route.navigate([`/unreservepage/${ids}/${userid}/${accesslevel}`])
    
  }
  clickedreserved(id:any){
    let ids=id;
    let accesslevel= this.access;

    let userid= this.getparamid;
    this.route.navigate([`/reservepage/${ids}/${userid}/${accesslevel}`])
  }
  clickedUser(){
    let accesslevel= this.access;

    let ids=this.getparamid;
    this.route.navigate([`/current/${ids}/${accesslevel}`])
  }
  getProjectInfo(name:any, id:any){
    let names=name;
    let ids= this.getparamid;
    let accesslevel= this.access;
    let projectid=id;
    this.route.navigate([`/project/${ids}/${projectid}/${names}/${accesslevel}`])
  }
  clickedHead(){
    let accesslevel= this.access;

    let ids=this.getparamid;
    this.route.navigate([`/read/${ids}/${accesslevel}`]);
  }
  clickChangeButton(){
    window.location.reload();
  }
  
}



