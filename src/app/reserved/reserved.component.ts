import { ApiserviceService } from '../apiservice.service';
import { Component , ComponentFactoryResolver, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit
{
  constructor(private apiservice:ApiserviceService, private route: Router, private router:ActivatedRoute){ }
  // apiservice!:ApiserviceService;
  readUser:any;
  successMsg:any;
  heading:any;
  reserved:any;
  left:any;
  projects:any;
  getparamid:any;
  access:any;
  ngOnInit():void{
    
    
    this.getparamid= this.router.snapshot.paramMap.get('id');
    this.access = this.router.snapshot.paramMap.get('access');
    console.log(this.access, this.getparamid);
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
      this.projects=res.data;
    });
  }
  read(){
    let ids=this.getparamid;
    let accesslevel = this.access;
    this.route.navigate([`/read/${ids}/${accesslevel}`]);
  }
  reserve(){
    let ids=this.getparamid;
    let accesslevel = this.access;

    this.route.navigate([`/reserved/${ids}/${accesslevel}`]);
  }
  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    this.route.navigate([`/adddevice/${ids}/${accesslevel}`])
  }
  clickedCart(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    this.route.navigate([`/cart/${ids}/${accesslevel}`]);
  }
  adduser(){
    let ids=this.getparamid;
    let accesslevel=this.access;
    this.route.navigate([`/create/${ids}/${accesslevel}`])
  }
  unreserve(){
    let ids=this.getparamid;
    let accesslevel = this.access;

    this.route.navigate([`/unreserved/${ids}/${accesslevel}`]);
  }
  clickedreserved(id:any){
    let ids=id;
    let userid= this.getparamid;
    let accesslevel = this.access;

    this.route.navigate([`/reservepage/${ids}/${userid}/${accesslevel}`]);
  }
  clickedUser(){
    let ids=this.getparamid;
    let accesslevel = this.access;

    this.route.navigate([`/current/${ids}/${accesslevel}`]);
  }
  getProjectInfo(name:any, id:any){
    let names=name;
    let ids= id;
    let accesslevel = this.access;
    let projectid=id;
    this.route.navigate([`/project/${ids}/${projectid}/${names}/${accesslevel}`])
  }
  clickedHead(){
    let ids=this.getparamid;
    let accesslevel = this.access;

    this.route.navigate([`/read/${ids}/${accesslevel}`]);
  }

}
