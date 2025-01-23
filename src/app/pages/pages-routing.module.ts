import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { AllcategoryproductComponent } from './allcategoryproduct/allcategoryproduct.component';
import { ProductviewpageComponent } from './productviewpage/productviewpage.component';
import { AddToCardComponent } from './add-to-card/add-to-card.component';
import { BuyComponent } from './buy/buy.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "topbar", component: TopbarComponent },
  { path: "footer", component: FooterComponent },
  { path: "allcatogery/:id", component: AllcategoryproductComponent },
  { path: "productViewPage/:id", component: ProductviewpageComponent },
  { path: "addToCart", component: AddToCardComponent },
  { path: 'buy', component: BuyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
