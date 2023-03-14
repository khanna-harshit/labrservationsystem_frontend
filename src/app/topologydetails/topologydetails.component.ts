import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute , NavigationEnd,} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-topologydetails',
  templateUrl: './topologydetails.component.html',
  styleUrls: ['./topologydetails.component.css']
})
export class TopologydetailsComponent {

  mySubscription:any;
  constructor(private apiservice:ApiserviceService,  private route: Router, private router:ActivatedRoute){ 
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
   
  }
  // apiservice!:ApiserviceService;
  readUser:any;
  heading:any;
  successMsg:any;
  topologyInformation:any;
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
  timeInterval:any;
  topologyname:any;
  sTime: any;
  eTime:any;
  hideSelectTime='yes';
  errMsg:any;
  showTime:any;
  extendedTime:any;
  extendedTimeInterval:any;
  extended:any;
  timeSlotForTopology:any;
  showDeviceInfo:any;
  isTakenForTopology=true;
  isTakenForTopo=true;
  showSelectTime='yes';
  currentStatus:any;
  showCurrentTime:any;
  currentStatusArr:any[]=[];
  extendedTimeSlotInformation:any;
  ngOnInit():void{
    this.timeInterval =  [{
      id:'btnradio1',
      startTime: '00:00',
      endTime: '2:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio2',
      startTime: '2:00',
      endTime: '4:00 ',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio3',
      startTime: '4:00',
      endTime: '6:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio4',
      startTime: '6:00',
      endTime: '8:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio5',
      startTime: '8:00',
      endTime: '10:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio6',
      startTime: '10:00',
      endTime: '12:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio7',
      startTime: '12:00',
      endTime: '14:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio8',
      startTime: '14:00',
      endTime: '16:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio9',
      startTime: '16:00',
      endTime: '18:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio10',
      startTime: '18:00',
      endTime: '20:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio11',
      startTime: '20:00',
      endTime: '22:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio12',
      startTime: '22:00',
      endTime: '24:00',
      status:'no',
      user:'none',
      topology_slot:'no',
      showHistory:'no',
      extended_slot:'no'
    }
  ];
    let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
    let offset= ISToffSet*60*1000;
    let date=new Date();
    this.startTime=new Date(date.getTime()+offset);
    this.endTime= new Date(date.getTime()+offset);
    this.endTime.setDate(this.endTime.getDate() + 10);
    this.startTime=this.startTime.toISOString().substring(0,16);
    this.endTime= this.endTime.toISOString().substring(0,16);
    this.sTime= this.startTime.substring(0, 10);
    this.eTime= this.endTime.substring(0, 10);
   
    this.currentTime= this.startTime.substring(11, 16);
    this.showCurrentTime=this.startTime.substring(0, 10);
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.access= this.router.snapshot.paramMap.get('access');
    this.topologyname= this.router.snapshot.paramMap.get('name');
    this.apiservice.getAllTeamMembers(this.getparamid, this.access).subscribe((res)=>{
      this.teamMembers= res.data;
      console.log("team Members data", res);
    })
   
    this.apiservice.getDistinctProjects(this.getparamid).subscribe((res)=>{
      this.projects=res.data;
    })
    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{

    let teamName= res.data[0].teamname;
    this.apiservice.getDataFromTopology(teamName).subscribe((res)=>{
      this.topologyInformation= res.data;
     for(let i=0;i<this.topologyInformation.length;i++){
        if(this.topologyInformation[i].topologyname==this.topologyname){
          this.extended=this.topologyInformation[i].type;
        }
     }
      console.log(this.extended, "extended Or Regular")
    })
    this.apiservice.getExtendedTimeInformation(this.topologyname).subscribe((res)=>{
      this.extendedTimeInterval = res.data;
      console.log(this.extendedTimeInterval, "extended Time Information");
    })
  })
    this.apiservice.selectTimeForTopology(this.topologyname, this.getparamid, this.startTime.substring(0, 11)).subscribe((res)=>{
      // console.log("ohqushqhsqh");
      // this.timeSlotForTopology=res.data;
      
      for(let i=0;i<res.data.length;i++){
        for(let j=0;j<this.timeInterval.length;j++){
          if(res.data[i].timeid==this.timeInterval[j].id && res.data[i].status!=='deleted'){
            this.timeInterval[j].topology_slot= 'yes';
            this.showDeviceInfo= "yes";
            this.timeInterval[j].showHistory='yes';
            this.timeInterval[j].user= res.data[i].name;
        }
        }
      }
      for(let i=0;i<this.timeInterval.length;i++){
        const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
        const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
        
        if(d2<d1){
          this.isTakenForTopology= false;
          this.timeInterval[i].topology_slot='invalid';
        }
      }
    })
    this.apiservice.getCurrentStatus().subscribe((res)=>{
      console.log(res.data, "current status data from  cart");
      this.currentStatus= res.data;
      for(let i=0;i<this.currentStatus.length;i++){
        this.currentStatusArr.push((this.currentStatus[i].deviceid).toString());
      }
     
      console.log(this.currentStatus+"current status ");

  })
    if(this.isTakenForTopology){
      for(let i=0;i<this.timeInterval.length;i++){
        const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
        const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
        
        if(d2<d1){
          this.isTakenForTopology= false;
          this.timeInterval[i].topology_slot='invalid';
        }
      }
    }
  }
    
   
    
  
  

  
  dateForm = new FormGroup({
    'startDate': new FormControl('',Validators.required),
    'endDate': new FormControl('', Validators.required)
  
  })
  clickedTimeSlot(id:any, startTime:any, endTime:any){
      this.timeSlotForTopology= id;
      console.log(id);
  }
  clickedTopology(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/topology/${ids}/${accesslevel}`
    
  }
  updateDeviceForTopology(id:any, nameOfTopology:any){
    let sTime="dn";
    let eTime= "bud";
    console.log(this.timeInterval, "testing")
    for(let i=0;i<this.timeInterval.length;i++){
      if(this.timeInterval[i].id==id){
        sTime= this.startTime.substring(0, 11)+this.timeInterval[i].startTime;
        eTime= this.startTime.substring(0, 11)+this.timeInterval[i].endTime;
      }
    }
    let paramid = this.getparamid;
    let accesslevel = this.access;
    let timeId= id;
    let deviceid: string[] = [];
    console.log(this.getparamid);

    console.log(this.topologyInformation, "topologyInformation");

    for(let i=0;i<this.topologyInformation.length;i++){
      // console.log(this.topologyInformation.topologyname, this.topologyname);
      if(this.topologyInformation[i].topologyname==nameOfTopology){
        
        deviceid.push(this.topologyInformation[i].deviceid);
      }
    }
    console.log(deviceid, 'deviceid');
    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{
      let data={
        name:res.data[0].name,
        team:res.data[0].teamname,
        timeid: timeId,
        DeviceId: deviceid,
        uId:this.getparamid,
        startTime:sTime,
        endTime:eTime

      }
      console.log(data);
      this.apiservice.updateDeviceForTopology(data, this.getparamid).subscribe((res)=>{
        window.location.href=`/current/${paramid}/${accesslevel}`

      }, (err)=>{
        this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
      })
      
      

    })
   

  }
  clickedRegisteredProject(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/registerproject/${ids}/${accesslevel}`

  }
  updateDeviceForTopologyExtended(id:any, nameOfTopology:any){
    console.log(this.dateForm.value);
    if(this.dateForm.valid){
    let sTime="dn";
    let eTime= "bud";
    console.log(this.timeInterval, "testing")
    for(let i=0;i<this.timeInterval.length;i++){
      if(this.timeInterval[i].id==id){
        sTime= this.timeInterval[i].startTime;
        eTime= this.timeInterval[i].endTime;
      }
    }
    let paramid = this.getparamid;
    let accesslevel = this.access;
    let timeId= id;
    let deviceid: string[] = [];
    console.log(this.getparamid);

    console.log(this.topologyInformation, "topologyInformation");

    for(let i=0;i<this.topologyInformation.length;i++){
      // console.log(this.topologyInformation.topologyname, this.topologyname);
      if(this.topologyInformation[i].topologyname==nameOfTopology){
        
        deviceid.push(this.topologyInformation[i].deviceid);
      }
    }
    console.log(deviceid, 'deviceid');
    this.apiservice.getuserinformation(this.getparamid).subscribe((res)=>{
      let data={
        name:res.data[0].name,
        team:res.data[0].teamname,
        timeid: timeId,
        DeviceId: deviceid,
        uId:this.getparamid,
        startTime:sTime,
        endTime:eTime,
        endDate:this.dateForm.value.endDate,
        startDate:this.dateForm.value.startDate

      }
      console.log(data);
      this.apiservice.updateDeviceForTopologyExtended(data, this.getparamid).subscribe((res)=>{
        console.log(res, "updated userdeviceinfo");
        window.location.reload();



      }, (err)=>{
        this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
      })
      // this.route.navigate([`/current/${paramid}/${accesslevel}`])

      


    })

  // this.extended='';
  this.successMsg= 'Reserved :)'
    }
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
  clickedSelectTime(){
    if(this.dateForm.valid){
      
      let stDate= this.dateForm.value.startDate;
      let enDate= this.dateForm.value.endDate;
      let s1= new Date();
      let s2= new Date();
      if(this.dateForm.value.startDate){
        s1= new Date(this.dateForm.value.startDate);
        console.log("start Date");
      }
      if(this.dateForm.value.endDate){
        s2= new Date(this.dateForm.value.endDate);
      }
      
      if(s1<=s2){
        let data={
          sDate:stDate,
          eDate:enDate,
          name:this.topologyname
        }
        // console.log(this.dateForm.value.startDate, this.dateForm.value.endDate);
        this.apiservice.getExtendedTimeSlotInformation(data).subscribe((res)=>{
          console.log(res.data, "extended time slot ");
          this.extendedTimeSlotInformation= res.data;
          for(let i=0;i<res.data.length;i++){
            for(let j=0;j<this.timeInterval.length;j++){
              if(res.data[i].timeid==this.timeInterval[j].id){
                this.timeInterval[j].extended_slot= 'yes';
                this.showDeviceInfo= "yes";
                this.timeInterval[j].showHistory='yes';
                this.timeInterval[j].user= res.data[i].name;
            }
            }
          }
          let s4=new Date(this.startTime.substring(0, 10));

          if(+s4==+s1){
          for(let i=0;i<this.timeInterval.length;i++){
            const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
            const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
            
            if(d2<d1){
              this.isTakenForTopo= false;
              this.timeInterval[i].extended_slot='invalid';
            }
          }
        }

        })
        let s3=new Date(this.startTime.substring(0, 10));

        
        if(this.isTakenForTopo && +s1==+s3){
          for(let i=0;i<this.timeInterval.length;i++){
            const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
            const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
            
            if(d2<d1){
              this.isTakenForTopo= false;
              this.timeInterval[i].extended_slot='invalid';
            }
          }
        }
        this.hideSelectTime='';

        this.showTime='yes';
        this.showSelectTime='';
    }
    else{
      this.errMsg='select proper date';
    }
    }
    else{
      this.errMsg= 'select date';
    }
  }
  reserve(){
    let ids=this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/reserved/${ids}/${accesslevel}`;
  }
  clickClose(){
    this.errMsg= '';
    this.successMsg='';
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
    window.location.href=`/create/${ids}/${accesslevel}`;
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
  clickChangeButton(){
    window.location.reload();
  }
  
}


