import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit{
  constructor(private apiservice:ApiserviceService,  private route: Router, private router:ActivatedRoute){ }
  // apiservice!:ApiserviceService;
  readUser:any;
  heading:any;
  successMsg:any;
  reserved:any;
  left:any;
  projects:any
  getparamid:any;
  access:any;
  teamMembers:any;
  startTime:any;
  endTime:any;
  currentTime:any;
  currentStatus:any;
  currentStatusArr:any[]=[];
  teamname:any;
  topologyInformation:any;
  devicesInTopology:any[]=[];
  ngOnInit():void{
    
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.access= this.router.snapshot.paramMap.get('access');
    this.apiservice.getAllTeamMembers(this.getparamid, this.access).subscribe((res)=>{
      this.teamMembers= res.data;
      console.log("team Members data", res);
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
    
    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{
      this.teamname= res.data[0].teamname;
      console.log(this.teamname, 'teamname')
      this.apiservice.getDataFromTopology(this.teamname).subscribe((res)=>{
        // console.log(res.data);
        // console.log(this.teamname, "team name ");
        // let data:any[]=[];
        // let name:any[]=[];
        // let Data= res.data;
        // for(let i=0;res.data.length;i++){
        //   let topology=res.data[i].topologyname;
        //   if(!this.topologyname.includes(topology)){
        //     this.topologyname.push(topology);
        //   }
        
        // }updateDeviceForTopology
          
        // console.log(data+"gwydgwdbwbdu");
        // this.topologyname=name;
        this.topologyInformation= res.data;
        for(let i=0;i<this.topologyInformation.length;i++){
        //   if(!this.topologyname.includes(this.topologyInformation[i].topologyname)){
        //     this.topologyname.push(this.topologyInformation[i].topologyname);
        //   }
          this.devicesInTopology.push(parseInt(this.topologyInformation[i].deviceid));
        }

        console.log(this.topologyInformation, this.devicesInTopology);
        

      })
    })
    this.apiservice.getCurrentStatus().subscribe((res)=>{
        console.log(res.data, "current status data");
        this.currentStatus= res.data;
        for(let i=0;i<this.currentStatus.length;i++){
          this.currentStatusArr.push(this.currentStatus[i].deviceid);
        }
        // console.log(this.currentStatus);
    })
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
  clickedTopology(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/topology/${ids}/${accesslevel}`
    
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
    window.location.href= `/reserved/${ids}/${accesslevel}`;
  }
  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/adddevice/${ids}/${accesslevel}`
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
  clickedunreserved(id:any, name:any){
    let ids=id;
    let accesslevel= this.access;
    let type='';
    for(let i=0;i<this.projects.length;i++){
        if(this.projects[i].projectname==name){
           type=this.projects[i].type;
        }
    }
    let userid= this.getparamid;
    window.location.href=`/unreservepage/${ids}/${userid}/${accesslevel}/${type}`
    
  }
  clickedreserved(id:any){
    let ids=id;
    let accesslevel= this.access;

    let userid= this.getparamid;
    
    window.location.href=`/reservepage/${ids}/${userid}/${accesslevel}`;
  }
  clickedUser(){
    let accesslevel= this.access;

    let ids=this.getparamid;
    window.location.href=`/current/${ids}/${accesslevel}`
    // `/project/${ids}/${projectid}/${names}/${accesslevel}`
    // this.route.navigate([`/current/${ids}/${accesslevel}`])
  }
  getProjectInfo(name:any, id:any){
    let names=name;
    let ids= this.getparamid;
    let accesslevel= this.access;
    let projectid=id;
    window.location.href=`/project/${ids}/${projectid}/${names}/${accesslevel}`

    // this.route.navigate([`/project/${ids}/${projectid}/${names}/${accesslevel}`])
  }
  clickedHead(){
    let accesslevel= this.access;
    let ids=this.getparamid;
    // this.route.navigate([`/read/${ids}/${accesslevel}`]);
    window.location.href=`/read/${ids}/${accesslevel}`

  }
  
}
