import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-allcategoryproduct',
  templateUrl: './allcategoryproduct.component.html',
  styleUrls: ['./allcategoryproduct.component.css']
})
export class AllcategoryproductComponent {
  categoryId: any;
  productResponse: any;

  constructor(private route: ActivatedRoute,private getdata:GetdataService) {}

  ngOnInit(): void {
    // Retrieve the categoryId from the route parameters
    this.route.params.subscribe(params => {
      this.categoryId = +params['id']; // The '+' is used to convert the string to a number
      console.log('Category ID:', this.categoryId);
    });
    this.valuesShows();
  }


valuesShows(){
const req={
  "dataCode":"GET_ALL_PRODUCT_DETAILS_PD",
  "productCategoryId":this.categoryId
}
this.getdata.commonData(req).subscribe((res:any)=>{
  if(res.statusCode==0){
    this.productResponse=res.responseContent;
    console.log('work');
  }
  else {
    console.log('not work');
    
  }
});
}

addToCart(val:any){
console.log(val);

}

}