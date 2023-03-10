import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute , NavigationEnd,} from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modifytopology',
  templateUrl: './modifytopology.component.html',
  styleUrls: ['./modifytopology.component.css']
})
export class ModifytopologyComponent {

  constructor(private apiservice:ApiserviceService,  private route: Router, private router:ActivatedRoute){ 
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  // apiservice!:ApiserviceService;
  readUser:any;
  heading:any;
  successMsg:any;
  reserved:any;
  left:any;
  projects:any
  getparamid:any;
  access:any;
  errMsg:any;
  topologyName:any;
  teamMembers:any;
  topologyInformation:any;
  teamname:any;
  projectname:any;
  orignalTopology:any[]=[];
  extendedOrRegular:any;
  arrayOfDevicesToAddInTopology: any[] = [];
  ngOnInit():void{
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.access= this.router.snapshot.paramMap.get('access');
    this.projectname= this.router.snapshot.paramMap.get('projectname');

    this.apiservice.getAllTeamMembers(this.getparamid, this.access).subscribe((res)=>{
      this.teamMembers= res.data;
      console.log("team Members data", res);
    })
    this.topologyName= this.router.snapshot.paramMap.get('name');
    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{
      this.teamname= res.data[0].teamname;
    
    this.apiservice.getDataFromTopology(this.teamname).subscribe((res)=>{
      this.topologyInformation= res.data;
      console.log(this.topologyInformation, "topologyInformation data");
      for(let i=0;i<this.topologyInformation.length;i++){
        if(this.topologyInformation[i].topologyname== this.topologyName){
          this.orignalTopology.push(parseInt(this.topologyInformation[i].deviceid));
          this.extendedOrRegular=this.topologyInformation[i].type;
          this.arrayOfDevicesToAddInTopology.push(parseInt(this.topologyInformation[i].deviceid));
        }
      }
      console.log(this.arrayOfDevicesToAddInTopology);
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
    this.route.navigate([`/cart/${ids}/${accesslevel}`]);
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
    this.route.navigate([`/read/${ids}/${accesslevel}`]);
  }
  reserve(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    this.route.navigate([`/reserved/${ids}/${accesslevel}`]);
  }
  clickedTopology(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    this.route.navigate([`/topology/${ids}/${accesslevel}`])
    
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
    'teamName':new FormControl('', Validators.required)
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
    this.route.navigate([`/adddevice/${ids}/${accesslevel}`])
  }
  clickClose(){
    this.errMsg='';
    this.successMsg= '';

  }
  clickedModify(arrayOfDevices:any){
    console.log(this.orignalTopology, arrayOfDevices);
    if(arrayOfDevices.toString()===this.orignalTopology.toString()){
      this.errMsg='All the devices are same !';
    }
    else{
      this.apiservice.deleteFromUserdeviceinfo(this.topologyName).subscribe((res)=>{
        console.log(res);
      })
      this.apiservice.deleteFromTopology(this.topologyName).subscribe((res)=>{
        this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{
          let topologyData={
            devices:arrayOfDevices,
            name:this.topologyName,
            teamname:res.data[0].teamname,
            type:this.extendedOrRegular
          }
          console.log(topologyData, "data for topology updation");
          this.apiservice.addDataToTopology(topologyData).subscribe((res)=>{
            this.successMsg= 'Updated !';
            console.log(res.data, "topology modified added");
          },(err)=>{
            this.errMsg='Topology name exist !';
          })
        })
      })
      this.apiservice.deleteDataFromUserDeviceInfo(arrayOfDevices).subscribe((res)=>{
        console.log(res);
      })

    }
  }
  clickedForm(data:any){
    if(data.length==0){
      this.errMsg='Select devices to add in topology '
    }
    else{
    if(this.topologyForm.valid){
      let topologyData={
        devices:data,
        name:this.topologyForm.value.topologyName,
        teamname: this.topologyForm.value.teamName
      
      }
      this.apiservice.addDataToTopology(topologyData).subscribe((res)=>{
        this.successMsg= res.message;
        console.log(res.data, "topology data added");
      },(err)=>{
        this.errMsg='Topology name exist !';
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
  clickedRegisteredProject(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/registerproject/${ids}/${accesslevel}`

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
  
}

