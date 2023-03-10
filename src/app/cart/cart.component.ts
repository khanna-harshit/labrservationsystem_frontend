import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute , NavigationEnd,} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
 mySubscription:any;
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
  currentTime:any;
  teamMembers:any;
  showDevice:any;
  startTime:any;
  endTime:any;
  isReload= false;
  timeInterval:any;
  dateAndTimeInfo:any;
  showDeviceInformation:any;
  topologyInformation:any;
  isTaken = true;
  detailsForTopology:any;
  showCurrentTime:any;
  timeSlotForTopology:any;
  teamname:any;
  topologyname:string[]=[];
  isTakenForTopology = true;
  currentStatus:any;
  currentStatusArr: any[] = [];
  ngOnInit():void{
    this.timeInterval =  [{
      id:'btnradio1',
      startTime: '00:00',
      endTime: '2:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio2',
      startTime: '2:00',
      endTime: '4:00 ',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio3',
      startTime: '4:00',
      endTime: '6:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio4',
      startTime: '6:00',
      endTime: '8:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio5',
      startTime: '8:00',
      endTime: '10:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio6',
      startTime: '10:00',
      endTime: '12:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio7',
      startTime: '12:00',
      endTime: '14:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio8',
      startTime: '14:00',
      endTime: '16:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio9',
      startTime: '16:00',
      endTime: '18:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio10',
      startTime: '18:00',
      endTime: '20:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio11',
      startTime: '20:00',
      endTime: '22:00',
      status:'no',
      user:'none',
      topology_slot:'no'

    },
    {
      id:'btnradio12',
      startTime: '22:00',
      endTime: '24:00',
      status:'no',
      user:'none',
      topology_slot:'no'
      

    }
  ];
    let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
    let offset= ISToffSet*60*1000;
    let date=new Date();
    
    this.startTime=new Date(date.getTime()+offset);
    this.endTime= new Date(date.getTime()+offset);
    this.endTime.setDate(this.endTime.getDate() + 3);
    
    this.startTime=this.startTime.toISOString().substring(0,16);
    this.endTime= this.endTime.toISOString().substring(0,16);
    this.currentTime= this.startTime.substring(11, 16);
    this.showCurrentTime= this.startTime.substring(0, 10);
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
    this.apiservice.selectTimeForDevicesInCart(this.getparamid, this.startTime.substring(0, 11)).subscribe((res)=>{
        this.dateAndTimeInfo= res.data;
        console.log(this.dateAndTimeInfo, "date and time info in cart");
        for(let i=0;i<this.dateAndTimeInfo.length;i++){
          for(let j=0;j<this.timeInterval.length;j++){
            if(this.dateAndTimeInfo[i].timeid==this.timeInterval[j].id && this.dateAndTimeInfo[i].status!=='deleted'){
              this.timeInterval[j].status= 'yes';
              this.showDeviceInformation= "yes";
              this.timeInterval[j].user= this.dateAndTimeInfo[i].name;
          }
          }
        }
        for(let i=0;i<this.timeInterval.length;i++){
          const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
          const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
          
          if(d2<d1){
            this.isTaken= false;
            this.timeInterval[i].status='invalid';
          }
        }
    })
  
    
    this.apiservice.getAllDeviceFromCart(this.getparamid).subscribe((res)=>
    {
      console.log(res, "device data");
      this.heading='yes';
      this.left='yes';
      this.readUser=res.data;
      if(this.isReload!=true){
          
          this.isReload= true;
          this.ngOnInit();
      }
     
      
    });
    this.apiservice.getDistinctProjects(this.getparamid).subscribe((res)=>{
      this.projects=res.data;
    })
    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{
      this.teamname= res.data[0].teamname;
      console.log(this.teamname, 'teamname')
      this.apiservice.getDataFromTopology(this.teamname).subscribe((res)=>{
        console.log(res.data);
        console.log(this.teamname, "team name ");
        // let data:any[]=[];
        let name:any[]=[];
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
          if(!this.topologyname.includes(this.topologyInformation[i].topologyname)){
            this.topologyname.push(this.topologyInformation[i].topologyname);
          }
        }
        console.log(this.topologyInformation, this.topologyname);
        

      })
    })
    this.apiservice.getCurrentStatus().subscribe((res)=>{
      console.log(res.data, "current status data from  cart");
      this.currentStatus= res.data;
      for(let i=0;i<this.currentStatus.length;i++){
        this.currentStatusArr.push((this.currentStatus[i].deviceid).toString());
      }
     
      console.log(this.currentStatus+"current status ");

  })
      if(this.isTaken){
        for(let i=0;i<this.timeInterval.length;i++){
          const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
          const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
          
          if(d2<d1){
          
            this.timeInterval[i].status='invalid';
          }
        }
      }
      }
      }
   
    
  deleteId(id:any, userid:any){
   
    this.apiservice.deleteData(id, userid).subscribe((res)=>{
      this.successMsg = res.message;
      console.log(this.successMsg);
      
    })
    
    this.ngOnInit(); 
    window.location.reload()

   
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  clickedTimeInterval(id:any, startTime:any, endTime:any){
    let ids= id;
    this.showDevice= ids;
    console.log(this.showDevice);

  }
  clickedRegisteredProject(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/registerproject/${ids}/${accesslevel}`

  }
  clickedTimeSlot(nameOfTopology:any, id:any, startTime:any, endTime:any){
    let name= nameOfTopology;
    let deviceid= [];
 
   
  let sTime= this.startTime.substring(0, 11)+startTime;
  let eTime= this.startTime.substring(0, 11)+endTime;
      
    
    for(let i=0;i<this.topologyInformation.length;i++){
      if(this.topologyInformation[i].topologyname==name){
        deviceid.push(this.topologyInformation[i].deviceid);
      }
    }
    

    this.timeSlotForTopology={
        Name:name,
        Id:id,
        StartTime:sTime,
        EndTime:eTime,
        DeviceId:deviceid
    }
    console.log(this.timeSlotForTopology);
  }
  clickedDetails(name:any){
    let ids = this.getparamid;
    let accesslevel = this.access;

    window.location.href=`/topologydetails/${ids}/${name}/${accesslevel}`
  }
  read(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/read/${ids}/${accesslevel}`;
  }
  reserveAllDevicesInCart(){
    let ids=this.getparamid;
    this.apiservice.reserveAllDevicesInCart(ids);
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
  clickedModify(name:any){
    let ids = this.getparamid;
    let accesslevel = this.access;
    let projectname='';
    for(let i=0;i<this.topologyInformation.length;i++){
      if(this.topologyInformation[i].topologyname==name){
          projectname= this.topologyInformation[i].projectname;
      }
    }
    window.location.href=`/modifytopology/${ids}/${name}/${accesslevel}/${projectname}`
  }
  updateDevice(timeId:any){
  
    let paramid= this.getparamid;
    let accesslevel = this.access;
    let sTime="dn";
    let eTime= "bud";
    for(let i=0;i<this.timeInterval.length;i++){
      if(this.timeInterval[i].id==timeId){
        sTime= this.startTime.substring(0, 11)+this.timeInterval[i].startTime;
        eTime= this.startTime.substring(0, 11)+this.timeInterval[i].endTime;
      }
    }
   

    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{
      let data={
          name:res.data[0].name,
          time: new Date(),
          status:'Reserved',
          UId: paramid,
          id:res.data[0].id,
          teamname:res.data[0].teamname,
          starttime: sTime,
          endtime:eTime,
          readUserValue: this.readUser,
          timeid: timeId

      }
   

        this.apiservice.updateuserdeviceinfoFromCart(this.getparamid, data).subscribe((res)=>{
          console.log(res, "uqshgudwug");
          window.location.href=`/current/${paramid}/${accesslevel}`
        })
      })
    }
  

    
    
clickedCart(){
  let ids= this.getparamid;
  let accesslevel= this.access;
  window.location.href=`/cart/${ids}/${accesslevel}`;
}
  
  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/adddevice/${ids}/${accesslevel}`
  }
  updateDeviceForTopology(timeSlotInformation:any){
    let paramid = this.getparamid;
    let accesslevel = this.access;
    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{
      let data={
        name:res.data[0].name,
        team:res.data[0].teamname,
        other:timeSlotInformation
      }
      this.apiservice.updateDeviceForTopology(data, this.getparamid).subscribe((res)=>{
        console.log(res, "updated userdeviceinfo");

      })
  })
  window.location.href=`/current/${paramid}/${accesslevel}`

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

