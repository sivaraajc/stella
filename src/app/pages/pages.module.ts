import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    DashboardComponent,
    TopbarComponent,
    FooterComponent,
    AllcategoryproductComponent,
    ProductviewpageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    CollapseModule
  ]
})
export class PagesModule { }
