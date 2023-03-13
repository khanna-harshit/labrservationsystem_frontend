import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
// import { BrowserModule } from '@angular/platform-browser';
// import the ScheduleModule for the Schedule component
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
//
import {MatDatepickerModule} from '@angular/material/datepicker';


// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// import {MaterialExampleModule} from '../material.module';
// import {DateRangePickerFormsExample} from './date-range-picker-forms-example';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';

// import {HttpClientModule} from '@angular/common/http';
import {ApiserviceService} from './apiservice.service';
import { ReservedComponent } from './reserved/reserved.component';
import { UnreservedComponent } from './unreserved/unreserved.component';
import { UserComponent } from './user/user.component';
import { ReservepageComponent } from './reservepage/reservepage.component';
import { UnreservepageComponent } from './unreservepage/unreservepage.component';
import { LoginComponent } from './login/login.component';
import { ProjectdesComponent } from './projectdes/projectdes.component';
import { AdddeviceComponent } from './adddevice/adddevice.component';
import { CurrentComponent } from './current/current.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LogoutComponent } from './logout/logout.component';
import { TeamComponent } from './team/team.component';
import { CartComponent } from './cart/cart.component';
import { ChnagepasswordComponent } from './chnagepassword/chnagepassword.component';
import { TopologyComponent } from './topology/topology.component';
import { TopologydetailsComponent } from './topologydetails/topologydetails.component';
import { ModifytopologyComponent } from './modifytopology/modifytopology.component';
import { RegisterprojectComponent } from './registerproject/registerproject.component';
import { UpdatedeviceComponent } from './updatedevice/updatedevice.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent,
    ReservedComponent,
    UnreservedComponent,
    UserComponent,
    ReservepageComponent,
    UnreservepageComponent,
    LoginComponent,
    ProjectdesComponent,
    AdddeviceComponent,
    CurrentComponent,
    LogoutComponent,
    TeamComponent,
    CartComponent,
    ChnagepasswordComponent,
    TopologyComponent,
    TopologydetailsComponent,
    ModifytopologyComponent,
    RegisterprojectComponent,
    UpdatedeviceComponent
    ],
  imports: [
    BrowserModule,
    ScheduleModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    //
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:4000,
      positionClass:'toast-bottom-right',
      newestOnTop: false
    })
    //
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
