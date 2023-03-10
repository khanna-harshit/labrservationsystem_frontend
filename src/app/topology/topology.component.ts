import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.css']
})
export class TopologyComponent {

  constructor(private apiservice:ApiserviceService,  private route: Router, private router:ActivatedRoute){ 
    
  }
  // apiservice!:ApiserviceService;
  readUser:any;
  heading:any;
  successMsg:any;
  reserved:any;
  left:any;
  projects:any
  projectname:any;
  getparamid:any;
  type:any;
  access:any;
  errMsg:any;
  topologyInformation:any;
  extended:any;
  topologyname:any;
  teamMembers:any;
  arrayOfDevicesInTopology:any[]=[];
  arrayOfDevicesToAddInTopology: any[] = [];
  ngOnInit():void{
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.access= this.router.snapshot.paramMap.get('access');
    this.apiservice.getAllTeamMembers(this.getparamid, this.access).subscribe((res)=>{
      this.teamMembers= res.data;
      console.log("team Members data", res);
    })
    
    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{

      let teamName= res.data[0].teamname;
      this.apiservice.getDataFromTopology(teamName).subscribe((res)=>{
        this.topologyInformation= res.data;
        for(let i=0;i<this.topologyInformation.length;i++){
          this.arrayOfDevicesInTopology.push(parseInt(this.topologyInformation[i].deviceid));
        }
        console.log(this.arrayOfDevicesInTopology, "array of devices in topology");
      })
    })
    if(this.access!='guest'){
    this.apiservice.updateDeviceTimeStatus().subscribe((res)=>{
      console.log("device Updated w.r.t time :)")
    })
    this.apiservice.getAllUser(this.getparamid).subscribe((res)=>
    {
      
      this.heading='yes';
      this.left='yes';
      this.readUser=res.data;
      
      
      
    });
    this.apiservice.getDistinctProjects(this.getparamid).subscribe((res)=>{
      console.log(res);
      this.projects=res.data;
      
    })

     }
  else{
    this.apiservice.getAllDevicesInfo().subscribe((res)=>
    {
      
      this.heading='yes';
      this.left='yes';
      this.readUser=res.data;
      
      
      
    });
    this.apiservice.getDistinctProjectsInfo(this.getparamid).subscribe((res)=>{
      console.log(res);
      this.projects=res.data;
    })
  }
  }

 
  clickedCart(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/cart/${ids}/${accesslevel}`;
  }
  clickedRegisteredProject(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/registerproject/${ids}/${accesslevel}`

  }
  addToCart(id:any){
    let ids= id;
    this.apiservice.addToCart(ids, this.getparamid).subscribe((res)=>{
      console.log("Added To Cart", res);
    })
  }
  read(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/read/${ids}/${accesslevel}`;
  }
  reserve(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/reserved/${ids}/${accesslevel}`;
  }
  clickedTopology(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/topology/${ids}/${accesslevel}`
    
  }
  addToTopology(id:string){
    let ids= id;
    if(!this.arrayOfDevicesToAddInTopology.includes(ids)){
      this.arrayOfDevicesToAddInTopology.push(ids);
    }
    console.log(this.arrayOfDevicesToAddInTopology);

    
  }
  topologyForm = new FormGroup({
    'topologyName': new FormControl('',Validators.required),
    // 'type': new FormControl('',Validators.required),

    
  })
  deleteFromTopology(id:string){
    let ids= id;
    var index = this.arrayOfDevicesToAddInTopology.indexOf(ids);
    if (index !== -1) {
       this.arrayOfDevicesToAddInTopology.splice(index, 1);
    }
    console.log(this.arrayOfDevicesToAddInTopology)
  }
  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/adddevice/${ids}/${accesslevel}`
  }
  clickClose(){
    this.errMsg='';
    this.successMsg= '';

  }
  clickedProjectName(name:any){
    this.projectname= name;
    for(let i=0;i<this.projects.length;i++){
      if(this.projects[i].projectname==this.projectname){
        this.type=this.projects[i].type;
      }

    }
  }
  clickedForm(data:any){
    if(data.length==0){
      this.errMsg='Select devices to add in topology '
    }
    else{
    if(this.topologyForm.valid){
      this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{

      
      let topologyData={
        devices:data,
        name:this.topologyForm.value.topologyName,
        type:this.type,
        teamname: res.data[0].teamname
      
      }
      this.apiservice.addDataToTopology(topologyData).subscribe((res)=>{
        this.successMsg= res.message;
        console.log(res.data, "topology data added");
      },(err)=>{
        this.errMsg='Topology name exist !';
      })
    })
    }
    else{
      this.errMsg='Enter all the fields !';
    }
    
  }
  }
  clickedMoreInformation(id:any){
    let memberId= id;
    let accessLevel = this.access;
    let userId = this.getparamid;
    window.location.href=`/team/${userId}/${accessLevel}/${memberId}`
  }
  unreserve(){
    let ids=this.getparamid;   
    let accesslevel= this.access;

    window.location.href=`/unreserved/${ids}/${accesslevel}`
  }
  adduser(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/create/${ids}/${accesslevel}`
  }
  clickedunreserved(id:any){
    let ids=id;
    let accesslevel= this.access;

    let userid= this.getparamid;
    window.location.href=`/unreservepage/${ids}/${userid}/${accesslevel}`
    
  }
  clickedreserved(id:any){
    let ids=id;
    let accesslevel= this.access;

    let userid= this.getparamid;
    window.location.href=`/reservepage/${ids}/${userid}/${accesslevel}`
  }
  clickedUser(){
    let accesslevel= this.access;

    let ids=this.getparamid;
    window.location.href=`/current/${ids}/${accesslevel}`
  }
  getProjectInfo(name:any, id:any){
    let names=name;
    let ids= this.getparamid;
    let accesslevel= this.access;
    let projectid=id;
    window.location.href=`/project/${ids}/${projectid}/${names}/${accesslevel}`
  }
  clickedHead(){
    let accesslevel= this.access;

    let ids=this.getparamid;
    window.location.href=`/read/${ids}/${accesslevel}`;
  }
  
}

