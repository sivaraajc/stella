import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboradComponent } from './admindashborad/admindashborad.component';
import { AdminaddpageComponent } from './adminaddpage/adminaddpage.component';
import { AdmineditpageComponent } from './admineditpage/admineditpage.component';

const routes: Routes = [
  {path:"",component:AdmindashboradComponent},
  {path:"addpage",component:AdminaddpageComponent},
  {path:"editpage",component:AdmineditpageComponent},
  {path:"carosel",loadChildren:()=>import("./carosel/carosel.module").then(mod=>mod.CaroselModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
