import { HttpClient } from '@angular/common/http';
import { identifierName, ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { inputs } from '@syncfusion/ej2-angular-schedule/src/schedule/schedule.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
  apiurl = 'http://localhost:3000/devices';
  cart = 'http://localhost:3000/cart';
  createurl = 'http://localhost:3000/device';
  userdeviceinfo='http://localhost:3000/userdeviceinfo';
  users = 'http://localhost:3000/users';
  project = 'http://localhost:3000/project';
  topology= 'http://localhost:3000/topology';


  constructor(private http:HttpClient) { 
  }
  getAllUser(id:any):Observable<any>{
    let ids=id;
    return this.http.get(`${this.apiurl}/${ids}`);
  }

  checkData(data:any):Observable<any>{
    
    return this.http.post(`${this.users}`, data);
  }

  // delete data
  reserveAllDevicesInCart(id:any):Observable<any>{
    let data= {
      status:'Reserved'
    }
    let ids= id;
    return this.http.put(`${this.cart}/${ids}`, data)
  }
  deleteData(id:any, userid:any):Observable<any>{
    let ids=id;
    return this.http.delete(`${this.cart}/${ids}/${userid}`);
  }
  getAllDeviceFromCart(id:any):Observable<any>{
    let ids= id;
    return this.http.get(`${this.cart}/${ids}`);
  }
  updateData(id:any, data:any):Observable<any>{
    let ids=id;
    return this.http.put(`${this.createurl}/${ids}`, data);
  }

  getSingleData(id:any):Observable<any>{
    let ids=id;
    return this.http.get(`${this.createurl}/${ids}`);

  }
  getUserDeviceInfo(id:any):Observable<any>{
    let ids=id;
    return this.http.get(`${this.userdeviceinfo}/${ids}`);
  }
  getUserInfo(id:any):Observable<any>{
    let ids=id;
    return this.http.get(`${this.userdeviceinfo}/${ids}`);
  }
  getCurrentStatus():Observable<any>{
    // let dateTime= time;
    return this.http.get(`${this.userdeviceinfo}`);
  }
  addDevice(data:any):Observable<any>{
    return this.http.put(`${this.apiurl}`, data)
  }
  getDistinctProjects(id:any):Observable<any>{
    let ids= id;
    return this.http.get(`${this.project}/${ids}`);
  }
  getProjectDevices(name:any):Observable<any>{
    let names= name;
    return this.http.get(`${this.apiurl}/${names}`);
  }
  getTypeInformation(name:any):Observable<any>{
    let projectname= name;
    return this.http.get(`${this.project}/${projectname}/get/type/project`)
  }
 createData(data:any):Observable<any>{
    return this.http.put(`${this.users}`, data);
 }
 updateDevice(paramid:any, data:any):Observable<any>{
  let device = paramid;
  let update= 'update';
  let information = 'information'
  return this.http.put(`${this.apiurl}/${device}/${update}/${information}`, data);
 }
 getuserinformation(id:any):Observable<any>{
  let ids = id;
  return this.http.get(`${this.users}/${ids}`)
 }
 updateuserdeviceinfo(deviceid:any, userid:any, data:any):Observable<any>{
  let device= deviceid;
  let user = userid;
  return this.http.put(`${this.userdeviceinfo}/${user}/${device}`, data);
 }
 getCurrentDeviceinfo(id:any):Observable<any>{
  let ids= id;
  let current = 'current'
  return this.http.get(`${this.apiurl}/${ids}/${current}`);
 }
 updateDeviceStatus(id:any, data:any):Observable<any>{
  let ids=id;
  let status='status';
  return this.http.put(`${this.apiurl}/${ids}/${status}`, data);
 }
 getAllDevicesInfo():Observable<any>{
  return this.http.get(`${this.apiurl}`);
 }
 getDistinctProjectsInfo(id:any):Observable<any>{
  let access= 'access';
  let ids= id;
  return this.http.get(`${this.project}/${ids}/${access}`);
 }
 getAllUserByProject(id:any, name:any):Observable<any>{
  let ids=id;
  let names= name;
  return this.http.get(`${this.apiurl}/${ids}/${names}`)
 }

 selectTimeFordevice(deviceId:any, datetime:any):Observable<any>{
  let deviceid=deviceId;
  let dateTime= datetime;
  console.log(dateTime);
  return this.http.get(`${this.userdeviceinfo}/${deviceid}/${dateTime}`);

 }

 getAllTeamMembers(id:any, access:any):Observable<any>{
  let ids = id;
  let accessLevel = access;
  return this.http.get(`${this.users}/${ids}/${accessLevel}`);
 }

  unreserveTheDeviceFromCurrent(id:any, time:any):Observable<any>{
    let ids= id;
    let data={
      status:'deleted',
      Time:time
    }
    
    return this.http.put(`${this.userdeviceinfo}/${ids}`, data)

  }
 updateDeviceTimeStatus():Observable<any>{
 

  let data={
    date:new Date()
  }
  let  url= 'url'
  let ids='ids'
  let news = 'new'
  let update = 'update'
  return this.http.put(`${this.apiurl}/${url}/${ids}/${news}/${update}`, data)
 }
 updateDeviceFromCart(id:any, data:any):Observable<any>{
  let ids=id;
  let updateDevicesStatus='updateDevicesStatus';
  return this.http.put(`${this.cart}/${ids}/${updateDevicesStatus}`, data);
 }
 updateuserdeviceinfoFromCart(id:any, data:any):Observable<any>{
  let ids=id;
  let updateUserdeviceinfoStatus='updateUserdeviceinfoStatus';
  let update = 'update';
  return this.http.put(`${this.cart}/${ids}/${updateUserdeviceinfoStatus}/${update}`, data);
 }
 addToCart(deviceid:any, userid:any):Observable<any>{
  
  let data={
    deviceId:deviceid,
    userId:userid

  }
  return this.http.put(`${this.cart}`,data);
 }
 uploadDataFromExcel(data:any):Observable<any>{
  let uploadData = 'uploadData';
  return this.http.post(`${this.apiurl}/${uploadData}`, data)
 }
uploadDataFromExcelUser(data:any):Observable<any>{
  let uploadData= 'uploadData';
  return this.http.put(`${this.users}/${uploadData}`, data)
}
registerProject(data:any):Observable<any>{
  return this.http.put(`${this.project}`, data);
}
getUserDeviceHistory(id:any, currentTime:any):Observable<any>{
  let ids= id;
  let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
  console.log(dateTime);
  let updatedTime= dateTime.replaceAll('-', '_');
  return this.http.get(`${this.userdeviceinfo}/${ids}/${updatedTime}/history`);
}
getExtendedTimeSlotInfo(id:any):Observable<any>{
  let ids=id;
  return this.http.get(`${this.apiurl}/${ids}/get/information`)
}
getUserDeviceHistoryTopology(id:any, currentTime:any):Observable<any>{
  let ids= id;
  let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
  console.log(dateTime);
  let updatedTime= dateTime.replaceAll('-', '_');
  return this.http.get(`${this.topology}/${ids}/${updatedTime}/history/device`);
}
getUserCurrentDevice(id:any, currentTime:any):Observable<any>{
  let ids= id;
  let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
  let updatedTime= dateTime.replaceAll('-', '_');

  return this.http.get(`${this.userdeviceinfo}/${ids}/${updatedTime}/current/device/status`);
}
deleteProject(name:any):Observable<any>{
  return this.http.delete(`${this.project}/${name}`);
}
getUserCurrentDeviceTopology(id:any, currentTime:any):Observable<any>{
  let ids= id;
  let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
  let updatedTime= dateTime.replaceAll('-', '_');

  return this.http.get(`${this.topology}/${ids}/${updatedTime}/current`);
}
getUserScheduledDeviceTopology(id:any, currentTime:any):Observable<any>{
  let ids= id;
  let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
  let updatedTime= dateTime.replaceAll('-', '_');

  return this.http.get(`${this.userdeviceinfo}/${ids}/${updatedTime}/schedule/device`);
}
getUserScheduledDevice(id:any, currentTime:any):Observable<any>{
  let ids= id;
  let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
  let updatedTime= dateTime.replaceAll('-', '_');

  return this.http.get(`${this.topology}/${ids}/${updatedTime}`);
}
unreserveTheDeviceFromSchedule(id:any):Observable<any>{
  let ids= id;
  return this.http.delete(`${this.userdeviceinfo}/${ids}`)
}

unreserveTheDeviceFromScheduleTopology(id:any, name:any, time:any):Observable<any>{
  let ids= id;
  let updatedTime= time.replaceAll('-', '_');
  return this.http.delete(`${this.userdeviceinfo}/${ids}/${name}/${updatedTime}`);
}
unreserveTheDeviceFromCurrentTopology(id:any, name:any, time:any):Observable<any>{

  let updatedTime= time.replaceAll('-', '_');
  let ids= id;
    let data={
      status:'deleted',
      Time:time
    }
    
    // return this.http.put(`${this.userdeviceinfo}/${ids}`, data)
  return this.http.put(`${this.userdeviceinfo}/${ids}/${name}/${updatedTime}`, data);
}
selectTimeForDevicesInCart(id:any, date:any):Observable<any>{
  let ids= id;
  let Date = date;
  return this.http.get(`${this.cart}/${ids}/${date}`);
}
addDataToTopology(data:any):Observable<any>{
  return this.http.put(`${this.topology}`, data);
}
getDataFromTopology(teamname:any):Observable<any>{
  let teamName= teamname;
  console.log(teamName);
  return this.http.get(`${this.topology}/${teamName}`);
}
getExtendedTimeSlotInformationDevice(data:any):Observable<any>{
  return this.http.post(`${this.userdeviceinfo}/data`, data);
}
deleteDataFromUserDeviceInfo(arrayOfDevices:any):Observable<any>{
  let data= {
    deviceId: arrayOfDevices,
  }
  let result:any;
  console.log(arrayOfDevices);
  for(let i=0;i<arrayOfDevices.length;i++){
    console.log(arrayOfDevices[i]);
    result = this.http.delete(`${this.userdeviceinfo}/${arrayOfDevices[i]}/delete/data/userdevice`);

  }
  return result;
}
updateDeviceForTopology(timeSlotInformation:any, id:any):Observable<any>{
  let data = timeSlotInformation;
  let ids= id;
  return this.http.put(`${this.topology}/${ids}`, data);
}
getReservationTypeForProject(name:any):Observable<any>{
  return this.http.get(`${this.project}/${name}/type/project`)
}
updateDeviceForTopologyExtended(timeSlotInformation:any, id:any):Observable<any>{
  let data = timeSlotInformation;
  let ids= id;
  let extended='extended';
  let update = 'update';
  return this.http.put(`${this.topology}/${ids}/${extended}/${update}`, data);
}
updateDeviceForExtended(timeSlotInformation:any, id:any):Observable<any>{
  let data = timeSlotInformation;
  let ids= id;

  return this.http.post(`${this.topology}/${ids}`, data);
}
deleteFromUserdeviceinfo(name:any):Observable<any>{
  return this.http.delete(`${this.userdeviceinfo}/${name}/delete`);
}
getExtendedTimeInformation(name:any):Observable<any>{
  return this.http.get(`${this.userdeviceinfo}/${name}`)
}
updateDeviceFromUpdateDevice(id:any, data:any):Observable<any>{
  return this.http.put(`${this.apiurl}/${id}`, data)
}
selectTimeForTopology(topologyname:any, id:any, dateTime:any):Observable<any>{
  let ids= id;
  let name = topologyname;
  let datetime= dateTime;
  let data = {
    name: topologyname,
    id:ids, 
    datetime:dateTime
  }
  return this.http.put(`${this.topology}/${ids}/${name}`, data);
}
deleteFromTopology(topologyName:any){
 
  let name = topologyName;
  
  return this.http.delete(`${this.topology}/${name}`);
}
getExtendedTimeSlotInformation(data:any):Observable<any>{
  return this.http.post(`${this.userdeviceinfo}`, data);
}

}