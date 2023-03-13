
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {View, EventSettingsModel,DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-updatedevice',
  templateUrl: './updatedevice.component.html',
  styleUrls: ['./updatedevice.component.css']
})
export class UpdatedeviceComponent implements OnInit{


 
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
    // showDeviceInformat:any;
    access:any;
    successMsg:any;
    sucMsg:any;
    errMsg:any;
    erMsg:any;
    deviceForm:any;
  
    ngOnInit():void{
      
  
    
      this.getparamid = this.router.snapshot.paramMap.get('id');
      // this.extended=this.router.snapshot.paramMap.get('type');
     
      this.getuserid= this.router.snapshot.paramMap.get('userid');
      this.access = this.router.snapshot.paramMap.get('access');
    
  
      if(this.getparamid){
        console.log(this.getparamid);
        this.api.getSingleData(this.getparamid).subscribe((res)=>{
          console.log(res);
          this.reservedata=res.data[0];
          console.log(this.reservedata);
          this.deviceForm = new FormGroup({
           
            'consoleip': new FormControl(this.reservedata.consoleip, Validators.required),
            'consoleport': new FormControl(this.reservedata.consoleport,Validators.required),
            'managementip': new FormControl(this.reservedata.managementip,Validators.required),
            'powercycleip': new FormControl(this.reservedata.powercycleip,Validators.required),
            'powercycleport': new FormControl(this.reservedata.powercycleport, Validators.required),
            'teamname': new FormControl(this.reservedata.teamname,Validators.required),
            'projectname': new FormControl(this.reservedata.projectname, Validators.required),
            'serialnumber':new FormControl(this.reservedata.serialnumber, Validators.required),
            'mac':new FormControl(this.reservedata.mac, Validators.required),
            'tg':new FormControl(this.reservedata.TG, Validators.required)
          })
        })
        this.api.getDistinctProjects(this.getuserid).subscribe((res)=>{
          this.projects=res.data;
        })
      }
      }
    
    
      clickedCart(){
        let ids= this.getuserid;
        let accesslevel= this.access;
        this.route.navigate([`/cart/${ids}/${accesslevel}`]);
      }
      read(){
        let ids=this.getuserid;
        let accesslevel = this.access;
        this.route.navigate([`/read/${ids}/${accesslevel}`]);
      }
      clickedRegisteredProject(){
        let ids= this.getparamid;
        let accesslevel = this.access;
        window.location.href=`/registerproject/${ids}/${accesslevel}`
    
      }
      clickClose(){
        this.errMsg='';
        this.erMsg='';
        this.sucMsg='';
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
  
        this.route.navigate([`/unreserved/${ids}/${accesslevel}`])
      }
      clickedUser(){
        let ids=this.getuserid;
        let accesslevel = this.access;
  
        this.route.navigate([`/current/${ids}/${accesslevel}`])
      }
     
       
        
        
       
     
     
      
      getProjectInfo(name:any, id:any){
        let names=name;
        let ids= id;
        let accesslevel = this.access;
        let projectid=id;
        this.route.navigate([`/project/${ids}/${projectid}/${names}/${accesslevel}`])
      }
      clickedTopology(){
        let ids= this.getuserid;
        let accesslevel = this.access;
        this.route.navigate([`/topology/${ids}/${accesslevel}`])
        
      }
      clickedHead(){
        let ids=this.getuserid;
        let accesslevel = this.access;
        this.route.navigate([`/read/${ids}/${accesslevel}`]);
      }
      adduser(){
        let ids=this.getuserid;
        let accesslevel=this.access;
        this.route.navigate([`/create/${ids}/${accesslevel}`])
      }
      adddevice(){
        let ids= this.getuserid;
        let accesslevel= this.access;
        this.route.navigate([`/adddevice/${ids}/${accesslevel}`])
      }
      clickedUpdateDevice(){
        console.log(this.deviceForm.valid)
        if(this.deviceForm.valid){
          this.api.updateDeviceFromUpdateDevice(this.getparamid, this.deviceForm.value).subscribe((res)=>{
            console.log("updated");
          })
            this.sucMsg="Updated!";
        }
        else{
            this.erMsg='all the fields should be present!';
        }
      }
      
  }
     
