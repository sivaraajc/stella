import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboradComponent } from './admindashborad/admindashborad.component';
import { AdminaddpageComponent } from './adminaddpage/adminaddpage.component';
import { AdmineditpageComponent } from './admineditpage/admineditpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdmindashboradComponent,
    AdminaddpageComponent,
    AdmineditpageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
