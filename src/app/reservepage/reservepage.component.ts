import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservepage',
  templateUrl: './reservepage.component.html',
  styleUrls: ['./reservepage.component.css']
})
export class ReservepageComponent implements OnInit{
  constructor(private api:ApiserviceService, private router:ActivatedRoute,  private route: Router){ }
  // apiservice!:ApiserviceService;
  getparamid: any;
  reservedata:any;
  userData:any;
  projects:any;
  getuserid:any;
  access:any;
  ngOnInit():void{
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.access = this.router.snapshot.paramMap.get('access');

    this.getuserid= this.router.snapshot.paramMap.get('userid');
    if(this.getparamid){


      console.log(this.getparamid);
      this.api.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res);
        this.reservedata=res.data[0];
  
})
this.api.getUserDeviceInfo(this.getparamid).subscribe((res)=>{
  this.userData= res.data[0];
 
})
this.api.getDistinctProjects(this.getuserid).subscribe((res)=>{
  this.projects=res.data;
})

}
    }
    clickedCart(){
      let ids= this.getparamid;
      let accesslevel= this.access;
      this.route.navigate([`/cart/${ids}/${accesslevel}`]);
    }
    clickedback(){
      let ids=this.getuserid;
      let accesslevel = this.access;
      this.route.navigate([`/read/${ids}/${accesslevel}`]);
    }
    read(){
      let ids=this.getuserid;
      let accesslevel = this.access;
      this.route.navigate([`/read/${ids}/${accesslevel}`]);
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
    let ids= this.getuserid;
    let accesslevel = this.access;
    let projectid=id;
    this.route.navigate([`/project/${ids}/${projectid}/${names}/${accesslevel}`])
  }
  clickedHead(){
    let ids=this.getuserid;
    let accesslevel = this.access;

    this.route.navigate([`/read/${ids}/${accesslevel}`]);
  }
  adddevice(){
    let ids= this.getuserid;
    let accesslevel= this.access;
    this.route.navigate([`/adddevice/${ids}/${accesslevel}`])
  }
  adduser(){
    let ids=this.getuserid;
    let accesslevel=this.access;
    this.route.navigate([`/create/${ids}/${accesslevel}`])
  }
  
}

