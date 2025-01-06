import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { LoaderComponent } from './loader/loader.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: "", loadChildren: () => import("./pages/pages.module").then(mod => mod. PagesModule) },
  { path: "admin", loadChildren: () => import("./admin/admin.module").then(mod => mod.AdminModule) },
  { path: "", component: LoaderComponent },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
