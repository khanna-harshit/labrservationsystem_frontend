import { Component , OnInit} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-projectdes',
  templateUrl: './projectdes.component.html',
  styleUrls: ['./projectdes.component.css']
})
export class ProjectdesComponent implements OnInit {
  getparamid:any;
  projects:any;
  getparamname:any;
  devices:any;
  access:any;
  currentStatus:any;
  topologyInformation:any;
  devicesInTopology:any[]=[];
  extended:any;
  teamname:any;
  currentStatusArr:any[]=[];
  constructor(private apiservice:ApiserviceService,  private route: Router, private router:ActivatedRoute, private changeDetectorRef: ChangeDetectorRef){ 
    // window.location.reload();
    // this.changeDetectorRef.detectChanges();
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  ngOnInit():void{
    this.getparamid=  this.router.snapshot.paramMap.get('id');
    this.getparamname= this.router.snapshot.paramMap.get('name');
    this.access = this.router.snapshot.paramMap.get('access');
    if(this.access!='guest'){
    this.apiservice.getDistinctProjects(this.getparamid).subscribe((res)=>{
      this.projects=res.data;
      // console.log(this.projects);
    })
   
    this.apiservice.getCurrentStatus().subscribe((res)=>{
      console.log(res.data, "current status data");
      this.currentStatus= res.data;
      for(let i=0;i<this.currentStatus.length;i++){
        this.currentStatusArr.push(this.currentStatus[i].deviceid);
      }
     
      // console.log(this.currentStatus);

  })
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
    console.log(this.getparamname);
    this.apiservice.getAllUser(this.getparamid).subscribe((res)=>{
      this.devices= res.data;

      console.log(this.devices);
    })
    this.apiservice.getReservationTypeForProject(this.getparamname).subscribe((res)=>{
        console.log(res, "reservation type for project");
        this.extended=res.data[0].type;
    })
    // location.reload();
    // this.changeDetectorRef.detectChanges();
    


  }
  else{
    this.apiservice.getAllDevicesInfo().subscribe((res)=>
    {
      
      
      this.devices=res.data;
      
      
      
    });
    this.apiservice.getDistinctProjectsInfo(this.getparamid).subscribe((res)=>{
      console.log(res);
      this.projects=res.data;
      // window.location.reload();
      // location.reload();
      // this.changeDetectorRef.detectChanges();
      


    })
  }

  }
  clickedCart(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/cart/${ids}/${accesslevel}`;
  }
  read(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/read/${ids}/${accesslevel}`;
  }

  clickedunreserved(id:any){
    let ids=id;
    let accesslevel=this.access;

    let userid = this.getparamid;
    let type= this.extended;
    window.location.href=`/unreservepage/${ids}/${userid}/${accesslevel}/${type}`;
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
  clickedreserved(id:any){
    let ids=id;
    let userid= this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/reservepage/${ids}/${userid}/${accesslevel}`
  }
  reserve(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/reserved/${ids}/${accesslevel}`
  }
  unreserve(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/unreserved/${ids}/${accesslevel}`
  }
  deleteProject(name:any){
    this.apiservice.deleteProject(name).subscribe((res)=>{
      let ids=this.getparamid;
      let accesslevel=this.access;
      window.location.href=`/read/${ids}/${accesslevel}`
    })
  }
  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/adddevice/${ids}/${accesslevel}`
  }
  adduser(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/create/${ids}/${accesslevel}`
  }
  clickedUser(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/current/${ids}/${accesslevel}`;
  }
  getProjectInfo(name:any, id:any){
    let names=name;
    let ids= this.getparamid;
    let accesslevel= this.access;
    let projectid= id;
    window.location.href=`/project/${ids}/${projectid}/${names}/${accesslevel}`
     
    
  }
  clickedHead(){
    let ids=this.getparamid;
    let accesslevel=this.access;

    window.location.href=`/read/${ids}/${accesslevel}`;
  }
}
