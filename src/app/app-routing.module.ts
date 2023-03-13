import { ReservepageComponent } from './reservepage/reservepage.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import {CreateComponent} from './create/create.component';
import {ReadComponent} from './read/read.component';
import {ReservedComponent} from './reserved/reserved.component';
import {UnreservedComponent} from './unreserved/unreserved.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {ProjectdesComponent} from './projectdes/projectdes.component';
import {AdddeviceComponent} from './adddevice/adddevice.component';
import {UnreservepageComponent} from './unreservepage/unreservepage.component';
import {CurrentComponent} from './current/current.component';
import {RegisterprojectComponent} from './registerproject/registerproject.component';

import {LogoutComponent} from './logout/logout.component';
import {TeamComponent} from './team/team.component';
import {CartComponent} from './cart/cart.component';
import {ChnagepasswordComponent} from './chnagepassword/chnagepassword.component';
import {TopologyComponent} from './topology/topology.component';
import {TopologydetailsComponent} from './topologydetails/topologydetails.component';
import {UpdatedeviceComponent} from './updatedevice/updatedevice.component';





// import {ReserveComponentDetailsComponent} from './ReserveComponentDetails/ReserveComponentDetails.component';

import { ExpenseGuard } from './expense.guard';
import { ModifytopologyComponent } from './modifytopology/modifytopology.component';

const routes: Routes = [
  {path:'create/:id/:access', component:CreateComponent, canActivate: [ExpenseGuard]},
  {path:'create/:id', component:CreateComponent, canActivate: [ExpenseGuard]},
  {path:'read/:id/:access', component:ReadComponent, canActivate: [ExpenseGuard]},
  {path:'', component:LoginComponent},
  {path:'logout', component:LogoutComponent},
  {path:'reserved/:id/:access', component:ReservedComponent, canActivate: [ExpenseGuard]},
  {path:'unreserved/:id/:access', component:UnreservedComponent, canActivate: [ExpenseGuard]},
  {path:'user/:id/:access', component:UserComponent, canActivate: [ExpenseGuard]},
  {path:'reservepage/:id/:userid/:access', component:ReservepageComponent, canActivate: [ExpenseGuard]},
  {path:'unreservepage/:id/:userid/:access/:type',component:UnreservepageComponent, canActivate: [ExpenseGuard]},
  {path:'project/:id/:projectid/:name/:access', component:ProjectdesComponent,canActivate: [ExpenseGuard]},
  {path:'adddevice/:id/:access', component:AdddeviceComponent, canActivate: [ExpenseGuard]},
  {path:'current/:id/:access', component:CurrentComponent, canActivate: [ExpenseGuard]},
  {path:'team/:id/:access/:memberid', component:TeamComponent, canActivate: [ExpenseGuard]},
  {path:'cart/:id/:access', component:CartComponent, canActivate: [ExpenseGuard]},
  {path:'changepassword/:id/:access', component:ChnagepasswordComponent, canActivate: [ExpenseGuard]},
  {path:'topology/:id/:access', component:TopologyComponent, canActivate: [ExpenseGuard]},
  {path:'topologydetails/:id/:name/:access', component:TopologydetailsComponent, canActivate: [ExpenseGuard]},
  {path:'modifytopology/:id/:name/:access/:projectname', component:ModifytopologyComponent, canActivate: [ExpenseGuard]},
  {path:'registerproject/:id/:access', component:RegisterprojectComponent, canActivate: [ExpenseGuard]},
  {path:'updatedevice/:id/:userid/:access', component:UpdatedeviceComponent, canActivate: [ExpenseGuard]},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//
export class AppRoutingModule { }
