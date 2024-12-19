import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaroselRoutingModule } from './carosel-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CaroselRoutingModule,
    FormsModule
  ]
})
export class CaroselModule { }
