import { Component , OnInit} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private api:ApiserviceService, private router:ActivatedRoute,  private route: Router){ }
  // apiservice!:ApiserviceService;
  readUser:any;
  successMsg:any;
  reserved:any;
  getparamid:any;
  user:any;
  projects:any;
  deviceInfo:any;
  access:any;
  ngOnInit():void{
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.access = this.router.snapshot.paramMap.get('access');

    console.log(this.getparamid);
    if(this.getparamid){
      this.api.getUserInfo(this.getparamid).subscribe((res)=>{
      console.log(res);
      this.user= res.data;
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
  clickedCart(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/cart/${ids}/${accesslevel}`;
  }
  clickedHistory(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/user/${ids}/${accesslevel}`;
  }
  clickedCurrent(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/current/${ids}/${accesslevel}`;
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
  clickedRegisteredProject(){
    let ids= this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/registerproject/${ids}/${accesslevel}`

  }
  clickedUser(){
    let ids=this.getparamid;
    let accesslevel = this.access;
    window.location.href=`/current/${ids}/${accesslevel}`
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
    window.location.href=`/create/${ids}/${accesslevel}`
  }
  adddevice(){
    let ids= this.getparamid;
    let accesslevel= this.access;
    window.location.href=`/adddevice/${ids}/${accesslevel}`
  }
}
