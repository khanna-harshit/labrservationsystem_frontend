import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {View, EventSettingsModel,DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-unreservepage',
  templateUrl: './unreservepage.component.html',
  styleUrls: ['./unreservepage.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  // template: `<ejs-schedule [eventSettings]='eventSettings'></ejs-schedule>`
})

export class UnreservepageComponent implements OnInit {
  constructor(private api:ApiserviceService, private router:ActivatedRoute,  private route: Router){ 
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  // apiservice!:ApiserviceService;
  getparamid: any;
  reservedata:any;
  projects:any;
  message:any;
  getuserid:any;
  showDevice:any;
  showDeviceInformat:any;
  access:any;
  startTime:any;
  successMsg:any;
  errMsg:any;
  endTime:any;
  sTime:any;
  eTime:any;
  currentTime:any;
  showSelectTime='yes';
  showTime:any;
  isTakenForTopology=true;
  isTakenForTopo=true;
  hideSelectTime='yes';
  extended:any;
  dateAndTimeInfo:any;
  showDeviceInfo:any;
  extendedTimeSlotInformation:any;
  informationHeading:any;
  showCurrentTime:any;
  timeSlotForTopology:any;
  extendedTimeInterval:any;
  showDeviceInformation:any;

  // public data: object[] = [{
  //   id: 1,
  //   subject: 'Meeting',
  //   startTime: new Date(),
  //   endTime: new Date()
  // }];
  // public selectedDate: Date = new Date(2018, 1, 15);
  // public currentView: View = 'Day';

  // public eventSettings: EventSettingsModel = {
  //   dataSource: this.data,
  //   fields: {
  //     id: 'id',
  //     subject: { name: 'eventName' },
  //     startTime: { name: 'startTime' },
  //     endTime: { name: 'endTime' },
  //   }
  // };
  timeInterval:any;

  ngOnInit():void{
    this.timeInterval =  [{
      id:'btnradio1',
      startTime: '00:00',
      endTime: '2:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'
    },
    {
      id:'btnradio2',
      startTime: '2:00',
      endTime: '4:00 ',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'


    },
    {
      id:'btnradio3',
      startTime: '4:00',
      endTime: '6:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio4',
      startTime: '6:00',
      endTime: '8:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio5',
      startTime: '8:00',
      endTime: '10:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio6',
      startTime: '10:00',
      endTime: '12:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio7',
      startTime: '12:00',
      endTime: '14:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio8',
      startTime: '14:00',
      endTime: '16:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio9',
      startTime: '16:00',
      endTime: '18:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio10',
      startTime: '18:00',
      endTime: '20:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio11',
      startTime: '20:00',
      endTime: '22:00',
      status:'no',
      user:'none',
      showHistory:'no',
      extended_slot:'no'

    },
    {
      id:'btnradio12',
      startTime: '22:00',
      endTime: '24:00',
      status:'no',
      user:'none',
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
    this.showCurrentTime=this.startTime.substring(0, 10);
    console.log(this.startTime);
    console.log(this.endTime);
    this.sTime= this.startTime.substring(0, 10);
    this.eTime= this.endTime.substring(0, 10);
    // console.log(this.startTime, this.endTime , "gsydguj");
    this.currentTime= this.startTime.substring(11, 16);
    console.log(this.currentTime);
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.extended=this.router.snapshot.paramMap.get('type');
    console.log(this.extended);
    this.getuserid= this.router.snapshot.paramMap.get('userid');
    this.access = this.router.snapshot.paramMap.get('access');
  

    if(this.getparamid){
      console.log(this.getparamid);
      this.api.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res);
        this.reservedata=res.data[0];
      })
      this.api.getDistinctProjects(this.getuserid).subscribe((res)=>{
        this.projects=res.data;
      })
    }

this.api.selectTimeFordevice(this.getparamid, this.startTime.substring(0, 11)).subscribe((res)=>{
  this.dateAndTimeInfo= res.data;
  for(let i=0;i<this.dateAndTimeInfo.length;i++){
    for(let j=0;j<this.timeInterval.length;j++){
      if(this.dateAndTimeInfo[i].timeid==this.timeInterval[j].id && this.dateAndTimeInfo[i].status!=='deleted'){
          this.timeInterval[j].status= 'yes';
          this.showDeviceInformation="yes";
          this.timeInterval[j].showHistory='yes';
          this.timeInterval[j].user=this.dateAndTimeInfo[i].name;
      }

    }
  }
  
  for(let i=0;i<this.timeInterval.length;i++){
    const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
    const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
    
    if(d2<d1){
      this.timeInterval[i].status='invalid';
    }
    
  
  }
  console.log(this.dateAndTimeInfo, "date and time information for device");


 
})
this.api.getExtendedTimeSlotInfo(this.getparamid).subscribe((res)=>{
  this.extendedTimeInterval = res.data;
  console.log(this.extendedTimeInterval);
})
if(this.showDeviceInformation!= 'yes'){
  for(let i=0;i<this.timeInterval.length;i++){
    const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
    const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
    
    if(d2<d1){
      this.timeInterval[i].status='invalid';
    }
    
  
  }
}



    }
    dateForm = new FormGroup({
      'startDate': new FormControl('',Validators.required),
      'endDate': new FormControl('', Validators.required)
    
    })
  
    clickedCart(){
      let ids= this.getuserid;
      let accesslevel= this.access;
       window.location.href=`/cart/${ids}/${accesslevel}`;
    }
    read(){
      let ids=this.getuserid;
      let accesslevel = this.access;
       window.location.href=`/read/${ids}/${accesslevel}`;
    }
    clickedRegisteredProject(){
      let ids= this.getparamid;
      let accesslevel = this.access;
      window.location.href=`/registerproject/${ids}/${accesslevel}`
  
    }
    clickClose(){
      this.errMsg='';
      this.successMsg='';
    }
    reserve(){
      let ids=this.getuserid;
      let accesslevel = this.access;

      this.route.navigate([`/reserved/${ids}/${accesslevel}`])
    }
    unreserve(){
      let ids=this.getuserid;
      let accesslevel = this.access;

       window.location.href=`/unreserved/${ids}/${accesslevel}`
    }
    clickedUser(){
      let ids=this.getuserid;
      let accesslevel = this.access;

       window.location.href=`/current/${ids}/${accesslevel}`
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
            deviceId:this.getparamid
          }
          this.api.getExtendedTimeSlotInformationDevice(data).subscribe((res)=>{
            console.log(res, "extendedTimeSlotInfor,ation");
            this.extendedTimeSlotInformation = res.data;
            for(let i=0;i<res.data.length;i++){
                    for(let j=0;j<this.timeInterval.length;j++){
                      if(res.data[i].timeid==this.timeInterval[j].id && res.data[i].status!=='deleted'){
                        this.timeInterval[j].extended_slot= 'yes';
                        this.showDeviceInfo= "yes";
                        this.timeInterval[i].showHistory='yes';
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
                console.log(+s3== +s1, "ugsugsugu");
                console.log(s1, s3);
                if(this.isTakenForTopo && +s3==+s1){
                  for(let i=0;i<this.timeInterval.length;i++){
                    const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
                    const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
                    console.log("ugusgudhuhhi")
                    if(d2<d1){
                      this.isTakenForTopo= false;
                      this.timeInterval[i].extended_slot='invalid';
                    }
                  }
                }
          
        //   // console.log(this.dateForm.value.startDate, this.dateForm.value.endDate);
        //   this.api.getExtendedTimeSlotInformation(data).subscribe((res)=>{
        //     console.log(res.data, "extended time slot information");
        //     this.extendedTimeSlotInformation= res.data;
        //     for(let i=0;i<res.data.length;i++){
        //       for(let j=0;j<this.timeInterval.length;j++){
        //         if(res.data[i].timeid==this.timeInterval[j].id && res.data[i].status!=='deleted'){
        //           this.timeInterval[j].extended_slot= 'yes';
        //           this.showDeviceInfo= "yes";
        //           this.timeInterval[i].showHistory='yes';
        //           this.timeInterval[j].user= res.data[i].name;
        //       }
        //       }
        //     }
        //     for(let i=0;i<this.timeInterval.length;i++){
        //       const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
        //       const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
              
        //       if(d2<d1){
        //         this.isTakenForTopo= false;
        //         this.timeInterval[i].extended_slot='invalid';
        //       }
        //     }
  
        //   })
        //   if(this.isTakenForTopo){
        //     for(let i=0;i<this.timeInterval.length;i++){
        //       const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
        //       const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
              
        //       if(d2<d1){
        //         this.isTakenForTopology= false;
        //         this.timeInterval[i].extended_slot='invalid';
        //       }
        //     }
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
    clickChangeButton(){
      window.location.reload();
    }
    clickedTimeInterval(id:any, startTime:any, endTime:any){
      let ids= id;
      let starttime= startTime;
      let endtime= endTime;
      this.showDeviceInformat= ids;
      console.log(this.showDeviceInformat);

    }
    updateDeviceInfo(){
      let userid= this.getuserid;
      let deviceid= this.getparamid;
      let accesslevel = this.access;
      window.location.href=`/updatedevice/${deviceid}/${userid}/${accesslevel}`

    }
    updateDeviceForExtended(id:any){
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
      let timeId= id;
      // let deviceid: string[] = [];
      // deviceid.push(paramid);
    
  
    
      // console.log(deviceid, 'deviceid');
      this.api.getuserinformation(this.getuserid).subscribe((res)=>{
        let data={
          name:res.data[0].name,
          team:res.data[0].teamname,
          timeid: timeId,
          DeviceId: this.getparamid,
          uId:this.getuserid,
          startTime:sTime,
          endTime:eTime,
          endDate:this.dateForm.value.endDate,
          startDate:this.dateForm.value.startDate
  
        }
        console.log(data);
        this.api.updateDeviceForExtended(data, this.getuserid).subscribe((res)=>{
          console.log(res, "updated userdeviceinfo");
          window.location.reload();
  
  
  
        },(err)=>{
          this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
        })
  
      })
  
    // this.extended='';
    this.successMsg= 'Reserved :)'
      }
    }
    getProjectInfo(name:any, id:any){
      let names=name;
      let ids= id;
      let accesslevel = this.access;
      let projectid=id;
       window.location.href=`/project/${ids}/${projectid}/${names}/${accesslevel}`
    }
    clickedTopology(){
      let ids= this.getuserid;
      let accesslevel = this.access;
       window.location.href=`/topology/${ids}/${accesslevel}`
      
    }
    clickedHead(){
      let ids=this.getuserid;
      let accesslevel = this.access;
       window.location.href=`/read/${ids}/${accesslevel}`;
    }
    adduser(){
      let ids=this.getuserid;
      let accesslevel=this.access;
       window.location.href=`/create/${ids}/${accesslevel}`
    }
    adddevice(){
      let ids= this.getuserid;
      let accesslevel= this.access;
       window.location.href=`/adddevice/${ids}/${accesslevel}`
    }
    clickedTimeSlot(id:any, startTime:any, endTime:any){
      this.timeSlotForTopology= id;
      console.log(id);
  }
    updateDevice(timeId:any){
      
      
      let sTime="dn";
      let eTime= "bud";
      for(let i=0;i<this.timeInterval.length;i++){
        if(this.timeInterval[i].id==timeId){
          sTime= this.startTime.substring(0, 11)+this.timeInterval[i].startTime;
          eTime= this.startTime.substring(0, 11)+this.timeInterval[i].endTime;
        }
      }
      let timeid= timeId;
      let userid=this.getuserid;
      let paramid= this.getparamid;
      let accesslevel = this.access;
      
      this.api.getuserinformation(this.getuserid).subscribe((res)=>{
        let data={
            name:res.data[0].name,
            time: new Date(),
            status:'Uneserved',
            UId: paramid,
            id:res.data[0].id,
            teamname:res.data[0].teamname,
            starttime: sTime,
            endtime: eTime,
            timeid:timeId

            
        }
        // this.api.updateDevice(this.getparamid, data).subscribe((res)=>{
          this.api.updateuserdeviceinfo(this.getparamid, this.getuserid, data).subscribe((res)=>{
       
             window.location.href=`/current/${userid}/${accesslevel}`
            
          }, (err)=>{
            this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
          })
        })
      // });
    
      
      
    }
    
    
   
}
   