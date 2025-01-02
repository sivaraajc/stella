import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/service/alert.service';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.css']
})
export class AddToCardComponent implements OnInit {
  cardResponse: any[] = []; // Holds cart details
  cardResponseDetails: any[] = [];
  currentProduct: any; // Holds the product currently being displayed
  currentIndex: number = 0; // Tracks the index of the current product

  constructor(private alert: AlertService, private getData: GetdataService) {}

  ngOnInit() {
    this.addToCardDetails();
  }

  addToCardDetails() {
    const req = {
      dataCode: 'GET_CART_DETAILS_BY_USERID',
      placeholderKeyValueMap: {
        userId: localStorage.getItem('userId'),
      },
    };
    this.getData.commonData(req).subscribe((res: any) => {
      if (res.statusCode === 0) {
        console.log(res,'Data fetched successfully');
        this.cardResponse = res.responseContent;
        this.addtoproductDetails();
      } else {
        console.log('Error fetching data');
      }
    });
  }

  addtoproductDetails() {
    const productRequests = this.cardResponse.map((data) => {
      const req = {
        dataCode: 'GETALL_PRODUCT_DETAILS_BY_PRODUCTID',
        placeholderKeyValueMap: {
          productId: data.product_id,
        },
      };
      this.getData.commonData(req).subscribe((res: any) => {
        if (res.statusCode === 0) {
          this.cardResponseDetails.push(res.responseContent);
          if (this.cardResponseDetails.length === 1) {
            // Set the first product as the current product
            this.currentProduct = this.cardResponseDetails[0];
          }
        }
      });
    });
  }

  showPreviousProduct() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentProduct = this.cardResponseDetails[this.currentIndex];
    }
  }

  showNextProduct() {
    if (this.currentIndex < this.cardResponseDetails.length - 1) {
      this.currentIndex++;
      this.currentProduct = this.cardResponseDetails[this.currentIndex];
    }
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  increaseQuantity(product: any) {
    product.quantity++;
  }

  removeFromCart(productId: string) {
    this.cardResponseDetails = this.cardResponseDetails.filter(
      (product) => product.id !== productId
    );
    if (this.currentIndex >= this.cardResponseDetails.length) {
      this.currentIndex = this.cardResponseDetails.length - 1;
    }
    this.currentProduct = this.cardResponseDetails[this.currentIndex];
  }

  calculateTotal() {
    return this.cardResponseDetails.reduce(
      (total, product) => total + product.product_price * product.quantity,
      0
    );
  }

  checkout() {
    console.log('Proceeding to checkout...');
    // Implement checkout logic here
  }
}