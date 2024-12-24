import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-allcategoryproduct',
  templateUrl: './allcategoryproduct.component.html',
  styleUrls: ['./allcategoryproduct.component.css']
})
export class AllcategoryproductComponent {
  categoryId: any;  // Store the category ID from the route
  productResponse: any;  // Store the list of products

  constructor(private route: ActivatedRoute, private getdata: GetdataService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const newCategoryId = +params['id']; // Convert 'id' to a number
      if (this.categoryId !== newCategoryId) {
        this.categoryId = newCategoryId;
        console.log('Category ID from route:', this.categoryId);

        this.valuesShows(this.categoryId);
      } else {
        console.log('Same category selected, no API call needed.');
      }
    });

  }

  valuesShows(categoryId: any) {
    const req = {
      "dataCode": "GET_ALL_PRODUCT_DETAILS_PD",
      "productCategoryId": categoryId // Pass categoryId for the API request
    };

    this.getdata.commonData(req).subscribe((res: any) => {
      if (res.statusCode === 0) {
        this.productResponse = res.responseContent;
        console.log('Product response:', this.productResponse);

        // Filter products by the categoryId from the route
        this.productResponse = this.productResponse.filter((product: any) => product.product_category_id === this.categoryId);
      } else {
        console.log('Error fetching data');
      }
    });
  }

  addToCart(val: any) {
    console.log(val);
  }

  productView(number: any): any {
    console.log(number);
    this.router.navigate(['/productViewPage/' + number]);
  }

  navigateToCategory(categoryId: number): void {
    console.log('Navigating to category with ID:', categoryId);
    this.router.navigate(['/allcatogery', categoryId], { replaceUrl: true });
    this.categoryId = categoryId;
    this.valuesShows(categoryId);
  }
}