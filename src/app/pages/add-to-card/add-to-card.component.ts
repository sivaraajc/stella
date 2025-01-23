import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/service/alert.service';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.css']
})
export class AddToCardComponent implements OnInit {
  cardResponseDetails: any[] = []; // Holds cart details
  currentProduct: any; // Holds the product currently being displayed
  currentIndex: number = 0; // Tracks the index of the current product

  constructor(private alert: AlertService, private getData: GetdataService,
    private router: Router) { }

  ngOnInit() {
    this.addToCardDetails();
  }

  addToCardDetails() {
    this.getData.addToCardUserList(localStorage.getItem('userId')).subscribe((res: any) => {
      if (res.statusCode === 0) {
        console.log(res, 'Data fetched successfully');
        this.cardResponseDetails = res.responseContent.map((item: { product_details: any; item_count: any; id: any; }) => ({
          ...item.product_details,
          quantity: item.item_count, // Mapping item_count to quantity
          cartId: item.id
        }));
        if (this.cardResponseDetails.length > 0) {
          this.currentProduct = this.cardResponseDetails[this.currentIndex];
        }
      } else {
        console.log('Error fetching data');
      }
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
      this.updateQuantity(product);
    }
  }

  increaseQuantity(product: any) {
    product.quantity++;
    this.updateQuantity(product);
  }

  updateQuantity(product: any) {
    const req = {
      "id": product.cartId,
      "itemCount": product.quantity,
      "createdDate": new Date()
    };
    this.getData.addToCartQuantityUpdate(req).subscribe(res => {
      if (res.statusCode === 0) {
        console.log("Quantity updated successfully");
      } else {
        console.log(res.errorMessage);
      }
    });
  }

  removeFromCart(productId: string) {
    this.getData.addToCardDelete(productId).subscribe((res: any) => {
      if (res.statusCode === 0) {
        this.alert.showCustomPopup('success', "Successfully removed from the cart");
        window.location.reload();
        console.log(res, 'Data fetched successfully');
      } else {
        console.log('Error fetching data');
      }
    });
  }

  calculateTotal() {
    return this.cardResponseDetails.reduce(
      (total, product) => total + (product.productPrice * product.quantity),
      0
    );
  }

  checkout() {
    console.log('Proceeding to checkout...');
    this.router.navigate(['buy']);
  }
}
