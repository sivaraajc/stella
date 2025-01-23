import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AllcategoryproductComponent } from './allcategoryproduct/allcategoryproduct.component';
import { ProductviewpageComponent } from './productviewpage/productviewpage.component';
import { CollapseModule } from 'angular-bootstrap-md';
import { AddToCardComponent } from './add-to-card/add-to-card.component';
import { BuyComponent } from './buy/buy.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TopbarComponent,
    FooterComponent,
    AllcategoryproductComponent,
    ProductviewpageComponent,
    AddToCardComponent,
    BuyComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    CollapseModule,
  ]
})
export class PagesModule { }
