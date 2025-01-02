import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  categoryList: any[] = [];
  isSearchVisible = false;
  profileImage: string = 'assets/dow.png';
  hideTopbarFlag: boolean;
  cartCounts: any ;
  userName: any;
  accountIcon:boolean;
  showLogoutDialog: boolean;
  constructor(private router: Router, private getData: GetdataService) { }

  ngOnInit(): void {
    this.cateogryList();
    this.cartCounts=localStorage.getItem('cartCount');
    this.userName = localStorage.getItem('email');
  }


  cateogryList() {
    const req = {
      "dataCode": "GET_ALL_CATEGORY"
    }
    this.getData.commonData(req).subscribe((res: any) => {
      if (res.statusCode == 0) {
        setTimeout(() => {
          this.categoryList = res.responseContent;
        }, 500);
      }
      else {

        this.categoryList = [];
        console.log("Error");
      }
    });
  }


  get displayName(): string {
    return this.userName.split('@')[0];
  }

  authLogout() {
    this.showLogoutDialog = true;
  }

  confirmLogout() {
    this.showLogoutDialog = false;
    this.router.navigate(['/']);
    localStorage.clear();
    console.log('User logged out');
    window.location.reload();
  }

  cancelLogout() {
    this.showLogoutDialog = false;
  }


  onLogin() {
    this.router.navigate(['/auth/auth/']);
  }



  navigateToCategory(categoryId: number): void {
    console.log('Navigating to category with ID:', categoryId);
    this.router.navigate(['/allcatogery', categoryId]);
  }
  searchOpen() {
    console.log("searchOpen");
    this.isSearchVisible = !this.isSearchVisible;
    this.hideTopbarFlag = true;
  }

  clearSearch() {
    this.isSearchVisible = false;
    this.hideTopbarFlag = false;
  }


  authLogin() {
    this.router.navigate(['/auth/auth/']);
  }

  addToCart() {
    this.router.navigate(['/addToCart']);
  }
}
