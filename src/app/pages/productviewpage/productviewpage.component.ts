import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-productviewpage',
  templateUrl: './productviewpage.component.html',
  styleUrls: ['./productviewpage.component.css']
})
export class ProductviewpageComponent implements OnInit {
  imageId: any;
  productResponse: any;

  constructor(private getData: GetdataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imageId = params['id'];
    });
    this.productView();
  }

  productView() {
    const req = {
      "dataCode": "GET_PRODUCT_DETAILS_BY_PRODUCTID",
      "placeholderKeyValueMap": {
        "id": this.imageId,
      }
    };
    this.getData.commonData(req).subscribe(res => {
      if (res.statusCode == 0) {
        this.productResponse = res.responseContent
        console.log(res.responseContent);
      }
      else {
        this.productResponse = [];
      }
    })
  }

  nextView(number: any) {
    console.log(number);
    this.router.navigate(['/productViewPage/' + number]);
  }



}
