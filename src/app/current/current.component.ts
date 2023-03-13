import { Component , OnInit} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit{
  constructor(private api:ApiserviceService, private router:ActivatedRoute,  private route: Router){ 
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  // apiservice!:ApiserviceService;
  readUser:any;
  successMsg:any;
  reserved:any;
  getparamid:any;
  history:any;
  projects:any;
  deviceInfo:any;
  access:any;
  current:any;
  startTime:any;
  currentTime:any;
  schedule:any;
  scheduleDevice:any;
  currentDevice:any;
  historyDevice:any;
  ngOnInit():void{


    let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
    let offset= ISToffSet*60*1000;
    let date=new Date();
    this.startTime=new Date(date.getTime()+offset);
    this.currentTime=this.startTime.toISOString().substring(0,16);
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.access = this.router.snapshot.paramMap.get('access');

    console.log(this.getparamid);
    if(this.getparamid){
      this.api.getUserDeviceHistory(this.getparamid, this.currentTime).subscribe((res)=>{
      console.log(res, "userdeviceinfo data");
      this.history= res.data;
    })
  }
    if(this.getparamid){
      this.api.getUserCurrentDevice(this.getparamid, this.currentTime).subscribe((res)=>{
      console.log(res, "current data");
      this.current= res.data;
    })
    this.api.getUserDeviceHistoryTopology(this.getparamid, this.currentTime).subscribe((res)=>{
      console.log(res, "userdeviceinfo data");
      this.historyDevice= res.data;
    })
    this.api.getUserCurrentDeviceTopology(this.getparamid, this.currentTime).subscribe((res)=>{
      console.log(res, "current data");
      this.currentDevice= res.data;
    })

    this.api.getUserScheduledDeviceTopology(this.getparamid, this.currentTime).subscribe((res)=>{
      console.log(res, "schedules data");
      this.schedule= res.data;
    })
    this.api.getUserScheduledDevice(this.getparamid, this.currentTime).subscribe((res)=>{
      console.log(res, "schedule data from userdeviceinfo")
      this.scheduleDevice= res.data;
    })
    this.api.getDistinctProjects(this.getparamid).subscribe((res)=>{
      this.projects=res.data;
    })
  }
}

  
  read(){
    let ids=this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/read/${ids}/${accesslevel}`;
  }
  clickedCurrent(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/current/${ids}/${accesslevel}`;
  }
  clickedTopology(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/topology/${ids}/${accesslevel}`;
    
  }
  clickedHistory(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/user/${ids}/${accesslevel}`;
  }
  reserve(){
    let ids=this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/reserved/${ids}/${accesslevel}`
  }
  unreserve(){
    let ids=this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/unreserved/${ids}/${accesslevel}`
  }
  clickedUser(){
    let ids=this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/current/${ids}/${accesslevel}`
  }
  clickedCart(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/cart/${ids}/${accesslevel}`;
  }
  getProjectInfo(name:any, id:any){
    let names=name;
    let ids= id;
    let accesslevel = this.access;
    let projectid=id;
    window.location.href=`/project/${ids}/${projectid}/${names}/${accesslevel}`
   }
  clickedHead(){
    let ids=this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/read/${ids}/${accesslevel}`;
  }
  adduser(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    window.location.href=`/create/${ids}/${accesslevel}`;
  }
  clickedRegisteredProject(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/registerproject/${ids}/${accesslevel}`

  }

  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/adddevice/${ids}/${accesslevel}`
  }
  clickedUnreserveFromCurrentDevice(id:any){
      this.api.unreserveTheDeviceFromCurrent(id, this.currentTime).subscribe((res)=>{
        this.successMsg = res.message;
        console.log(this.successMsg);
      })
      window.location.reload();
    }
    clickedUnreserveFromCurrentTopology(id:any, type:any, name:any, time:any){
      if(type=='topology'){
       
        this.api.unreserveTheDeviceFromCurrentTopology(id, name,time).subscribe((res)=>{
            console.log(res, "hello india");
        })
          // console.log("in am harshit khanna");
      }
      this.ngOnInit();
      window.location.reload();

    }
    clickedUnreserveFromScheduleTopology(id:any, type:any, name:any, time:any){
      if(type=='topology'){
       
        this.api.unreserveTheDeviceFromScheduleTopology(id, name,time).subscribe((res)=>{
            console.log(res);
        })
      }
      this.ngOnInit();
      window.location.reload();

    }
    clickedUnreserveFromSchedule(id:any){
       this.api.unreserveTheDeviceFromSchedule(id).subscribe((res)=>{
          this.successMsg= res.message;
        })
        this.ngOnInit();
        window.location.reload();
    }
  }

   