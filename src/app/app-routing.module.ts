import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path:"",loadChildren:()=>import("./pages/pages.module").then(mod=>mod.PagesModule)},
  {path:"**",component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
